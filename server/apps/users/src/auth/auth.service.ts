// auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegisterDto } from './dto/registerSchema.dto';
import {hash, compare} from 'bcrypt';
import { EmailService } from './email/email.service';
import { AccountEntity } from '../entities/accounts.entity';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';
import { TokenDto } from './dto/tokenSchema.dto';
import { LoginDto } from './dto/loginSchema.dto';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly emailService: EmailService,
  ) { }

  // Verificacion de Email
  async verifyEmailToken(tokenDto: TokenDto) {
    try {
      // Verificar si el token está presente
      if (!tokenDto.token) {
        return { message: 'Token is required' };
      }

      // Decodificar el token JWT
      const decoded: any = this.jwtService.verify(tokenDto.token);

      // Buscar al usuario asociado al token
      const user = await this.userRepository.findOne({
        where: { id: decoded.userId, verificationToken: tokenDto.token },
      });

      if (!user) {
        return { message: 'User not found' };
      }

      // Verificar si el token ha expirado
      const currentTime = new Date();
      if (
        user.emailVerificationExpiresAt &&
        user.emailVerificationExpiresAt <= currentTime
      ) {
        return { message: 'Token has expired' };
      }

      // Actualizar el estado del usuario
      user.isEmailVerified = true;
      user.verificationToken = null;
      user.emailVerificationExpiresAt = null;
      await this.userRepository.save(user);
      //
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        
      };

      // Generar un nuevo token de inicio de sesión
      const loginToken = this.jwtService.sign(
        tokenPayload,
        { expiresIn: '24h' },
      );
      console.log(loginToken)

      return { message: 'Email verified successfully', token: loginToken };
    } catch (error) {
      return { message: 'Something went wrong' };
    }
  }

  // Registrar Usuario
  async registerUser(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const userExists = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (userExists) {
      return { message: 'El email ya está registrado.' };
    }
    // Encriptar la contraseña
    const encryptedPassword = await hash(registerDto.password, 10);
    // Crear nuevo usuario
    const newUser = this.userRepository.create({
      firstName: registerDto.firstName,
      email: registerDto.email,
      password: encryptedPassword,
      isEmailVerified: true
    });
    await this.userRepository.save(newUser);

    // Generar token de verificación con fecha de expiración
    // const emailVerificationExpiresAt = new Date();
    // emailVerificationExpiresAt.setHours(
    //   emailVerificationExpiresAt.getHours() + 1,
    // );
    // const verificationToken = this.jwtService.sign({
    //   userId: newUser.id,
    //   email: newUser.email
    // }
    //);
    //newUser.verificationToken = verificationToken;

    // Guardar el nuevo usuario
    await this.userRepository.save(newUser);

    // Crear registro en la tabla de cuentas
    const newAccount = this.accountRepository.create({
      userId: newUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: newUser.id,
    });

    await this.accountRepository.save(newAccount);

    // Enviar correo de verificación
    // try {
    //   await this.emailService.sendVerificationEmail(
    //     newUser.email,
    //     verificationToken,
    //   );
    // } catch (error) {
    //   console.error('Error enviando correo de verificación:', error);
    //   return { message: 'No se  pudo enviar el correo de verificacion' };
    // }

    // Retornar respuesta
    // Crear el payload del token
    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    // Generar el token
    const token = this.jwtService.sign(tokenPayload, { expiresIn: '24h' });

    // Solo se retorna el token aquí, no la cookie
    return { token };
  }
  // Login y tambien Registro con Google
  async validateGoogleUser(profile: any) {
    const { email, provider, providerAccountId, displayName, image } = profile;

    if (!email) {
      return {
        message:
          'El perfil de Google no continene un correo electronico valido',
      };
    }

    // 1. Buscar si el usuario ya existe por su email
    let user = await this.userRepository.findOne({
      where: { email },
      relations: ['accounts'],
    });

    if (user) {
      const existingAccount = user.accounts.find(
        (account) =>
          account.provider === provider &&
          account.providerAccountId === providerAccountId,
      );

      if (!existingAccount) {
        const newAccount = this.accountRepository.create({
          userId: user.id,
          provider,
          providerAccountId,
          access_token: profile.accessToken || null,
          refresh_token: profile.refreshToken || null,
        });
        await this.accountRepository.save(newAccount);
      }

      return user;
    }

    user = this.userRepository.create({
      email,
      firstName: displayName?.split(' ')?.[0] || null,
      lastName: displayName?.split(' ')?.[1] || null,
      image: image || null,
      isEmailVerified: true,
    });

    user = await this.userRepository.save(user);

    const account = this.accountRepository.create({
      userId: user.id,
      provider,
      providerAccountId,
      access_token: profile.accessToken || null,
      refresh_token: profile.refreshToken || null,
    });
    await this.accountRepository.save(account);

    return user;
  }

  //login con credenciales email y password
  async login(loginDto: LoginDto) {
    console.log("loginDto")
    try {
      // Buscar al usuario por correo electrónico
      const user = await this.userRepository.findOne({
        where: { email: loginDto.email },
      });
      console.log("user")
      // Verificar si el usuario existe
      if (!user) {
        return { message: 'Datos incorrectos' };
      }

      // Verificar si el correo electrónico está verificado
      if (!user.isEmailVerified) {
        return { message: 'El correo electronico no ha sido verificado' };
      }

      // Verificar si el usuario tiene una contraseña configurada
      if (!user.password) {
        throw new BadRequestException('Error: Contraseña no encontrada');
      }

      // Verificar si la contraseña es válida
      const isPasswordValid = await compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Contraseña incorrecta');
      }

      // Crear el payload del token
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      // Generar el token
      const token = this.jwtService.sign(tokenPayload, { expiresIn: '24h' });

      // Solo se retorna el token aquí, no la cookie
      return { token };

    } catch (error) {
      return { message: 'Ocurrio un error al iniciar session' };
    }
  }

  // //enviar otro email de verifiacion de token

  async resendVerificationToken(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return { message: 'User not found' };
    }

    if (user.isEmailVerified) {
      return { message: 'El email ya está verificado' };
    }

    const emailVerificationExpiresAt = new Date();
    emailVerificationExpiresAt.setHours(
      emailVerificationExpiresAt.getHours() + 1,
    ); // 1 hora para expirar

    const verificationToken = this.jwtService.sign(
      {
        userId: user.id,
        email: user.email
      },
      { expiresIn: '24h' }
    );

    user.verificationToken = verificationToken;
    user.emailVerificationExpiresAt = emailVerificationExpiresAt;
    await this.userRepository.save(user);

    await this.emailService.sendVerificationEmail(
      user.email,
      verificationToken,
    );

    return { message: 'Verification token resent successfully' };
  }
  // ResetPassword
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return { message: 'User not found' };
    }

    const resetPasswordExpiresAt = new Date();
    resetPasswordExpiresAt.setHours(resetPasswordExpiresAt.getHours() + 1); // 1 hora para expirar

    const resetToken = this.jwtService.sign(
      {
        userId: user.id,
        email: user.email
      });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await this.userRepository.save(user);

    await this.emailService.sendPasswordResetEmail(user.email, resetToken);
    return { message: 'Password  reset token sent successfylly' };
  }
  //reset password
  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return { message: 'User not found' };
    }

    if (
      !user.resetPasswordToken ||
      user.resetPasswordToken !== token ||
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date()
    ) {
      return { message: 'Invalid or expired token' };
    }

    const encryptedPassword = await hash(newPassword, 10);

    user.password = encryptedPassword;
    user.resetPasswordToken = null; // Limpiar token
    user.resetPasswordExpiresAt = null; // Limpiar expiración
    await this.userRepository.save(user);

    return { message: 'Password reset successfully' };
  }
  // Verificar el token JWT
  verifyJwt(token: string): any {
    try {
      return this.jwtService.verify(token)
      //return jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta

    } catch (error) {
      return { message: 'Token invalido o expirado' };
    }
  }

  // buscar usuario por ID
  async findUserById(userId: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
