// auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegisterSchema } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { AccountEntity } from '../entities/accounts.entity';
import { generateVerificationToken } from './utils/authToken';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>, // Inyectamos la tabla accounts
    private readonly emailService: EmailService,
  ) {}

  async verifyEmailToken(token: string): Promise<void> {
    try {
      // Verificar el formato del token recibido
      if (!token) {
        throw new BadRequestException('Token is required');
      }

      // Decodificar el token usando la clave secreta
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar al usuario por el ID y el token de verificación
      const user = await this.userRepository.findOne({
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

      // Actualizar el estado del usuario
      user.isEmailVerified = true;
      user.verificationToken = null; // Limpiar el token
      user.emailVerificationExpiresAt = null; // Limpiar la fecha de expiración
      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }
      throw new BadRequestException(error.message || 'Something went wrong');
    }
  }

  async registerUser(registerDto: any) {
    // Validamos los datos con Zod
    const validationResult = RegisterSchema.safeParse(registerDto);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors); // Lanzamos un error si la validación falla
    }

    // 1. Verificar si el correo ya está registrado
    const userExists = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (userExists) {
      throw new BadRequestException('Email already registered');
    }

    // 2. Encriptar la contraseña
    const encryptedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. Crear el nuevo usuario
    const newUser = this.userRepository.create({
      email: registerDto.email,
      password: encryptedPassword,
    });

    // Calcular la fecha de expiración del token (1 hora después de la creación)
    const emailVerificationExpiresAt = new Date();
    emailVerificationExpiresAt.setHours(
      emailVerificationExpiresAt.getHours() + 1,
    ); // Expira en 1 hora

    // Generar y almacenar el token de verificación
    const verificationToken = generateVerificationToken(
      newUser.id,
      newUser.email,
    );
    newUser.verificationToken = verificationToken;

    // Guardar el usuario con la fecha de expiración y el token
    await this.userRepository.save(newUser);

    // Crear el registro en la tabla 'accounts' para asociar este usuario con su cuenta de tipo 'credentials'
    const newAccount = this.accountRepository.create({
      userId: newUser.id,
      type: 'credentials', // Tipo de cuenta (credenciales)
      provider: 'credentials', // Proveedor de la cuenta
      providerAccountId: newUser.id, // ID del usuario, como cuenta de credenciales
    });

    await this.accountRepository.save(newAccount);

    await this.emailService.sendVerificationEmail(
      newUser.email,
      verificationToken,
    );

    return { message: 'Registration successful, please verify your email' };
  }
}
