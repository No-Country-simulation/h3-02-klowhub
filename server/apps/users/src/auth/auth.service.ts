// auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegisterDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { AccountEntity } from '../entities/accounts.entity';
import {
  generateResetToken,
  generateVerificationToken,
} from './utils/authToken';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';
import { Response } from 'express';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly emailService: EmailService,
  ) {}

  // Verificacion de Email
  async verifyEmailToken(token: string): Promise<any> {
    let user;
    try {
      console.log(token);
      if (!token) {
        throw new BadRequestException('Token is required');
      }
      // Decodificar el token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      // Buscar al usuario usando el ID y el token de verificación
      user = await this.userRepository.findOne({
        where: { id: decoded.userId, verificationToken: token },
      });
      if (!user) {
        throw new Error('User not found');
      }
      // Verificar si el token ha expirado
      const currentTime = new Date();
      if (
        user.emailVerificationExpiresAt &&
        user.emailVerificationExpiresAt < currentTime
      ) {
        throw new BadRequestException('Token has expired');
      }
      // Si el token es válido, actualizar el estado de verificación
      user.isEmailVerified = true;
      user.verificationToken = null;
      user.emailVerificationExpiresAt = null;
      // Guardar la información actualizada en la base de datos
      await this.userRepository.save(user);
      // Crear el token de login (puedes generar uno nuevo para el usuario)
      const loginToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );
      return { message: 'Email verified successfully', token: loginToken };
    } catch (error) {
      if (
        error instanceof jwt.JsonWebTokenError ||
        error.message === 'User not found'
      ) {
        if (user) {
          // Limpiar el token de verificación si el token es inválido
          user.verificationToken = null;
          user.emailVerificationExpiresAt = null;
          await this.userRepository.save(user);
        }
        throw new BadRequestException('Invalid token');
      }
      // Captura de cualquier otro error
      throw new BadRequestException(error.message || 'Something went wrong');
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
    const encryptedPassword = await bcrypt.hash(registerDto.password, 10);
    // Crear nuevo usuario
    const newUser = this.userRepository.create({
      email: registerDto.email,
      password: encryptedPassword,
    });

    // Generar token de verificación con fecha de expiración
    const emailVerificationExpiresAt = new Date();
    emailVerificationExpiresAt.setHours(
      emailVerificationExpiresAt.getHours() + 1,
    );
    const verificationToken = generateVerificationToken(
      newUser.id,
      newUser.email,
    );
    newUser.verificationToken = verificationToken;

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
    try {
      await this.emailService.sendVerificationEmail(
        newUser.email,
        verificationToken,
      );
    } catch (error) {
      console.error('Error enviando correo de verificación:', error);
      throw new BadRequestException(
        'No se pudo enviar el correo de verificación.',
      );
    }

    // Retornar respuesta
    return {
      message: 'Registro exitoso. Por favor verifica tu email.',
    };
  }
  // Login y tambien Registro con Google
  async validateGoogleUser(profile: any) {
    const { email, provider, providerAccountId, displayName, image } = profile;

    if (!email) {
      throw new Error(
        'El perfil de Google no contiene un correo electrónico válido.',
      );
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
  async login(
    email: string,
    password: string,
    res: Response,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('El correo electrónico no está registrado');
    }
    if (!user.isEmailVerified) {
      throw new BadRequestException(
        'El correo electrónico no ha sido verificado. Por favor verifica tu email.',
      );
    }

    if (!user.password) {
      throw new BadRequestException(
        'El usuario no tiene una contraseña configurada.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1h', // El token expira en 1 hora
    });
    // Configurar la cookie
    res.cookie('auth_token', token, {
      httpOnly: true, // Solo accesible desde el servidor
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'strict', // Evita el envío en solicitudes de terceros
      maxAge: 60 * 60 * 1000, // 1 hora
    });
    return { message: 'Inicio de sesión exitoso' };
  }

  //enviar otro email de verifiacion de token
  async resendVerificationToken(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const emailVerificationExpiresAt = new Date();
    emailVerificationExpiresAt.setHours(
      emailVerificationExpiresAt.getHours() + 1,
    ); // 1 hora para expirar

    const verificationToken = generateVerificationToken(user.id, user.email);

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
      throw new BadRequestException('User not found');
    }

    const resetPasswordExpiresAt = new Date();
    resetPasswordExpiresAt.setHours(resetPasswordExpiresAt.getHours() + 1); // 1 hora para expirar

    const resetToken = generateResetToken(user.id, user.email);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await this.userRepository.save(user);

    await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'Password reset token sent successfully' };
  }

  //reset password
  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (
      !user.resetPasswordToken ||
      user.resetPasswordToken !== token ||
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    user.password = encryptedPassword;
    user.resetPasswordToken = null; // Limpiar token
    user.resetPasswordExpiresAt = null; // Limpiar expiración
    await this.userRepository.save(user);

    return { message: 'Password reset successfully' };
  }
}
