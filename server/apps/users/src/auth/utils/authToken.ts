import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

// Función para generar un token JWT de verificación
export const generateVerificationToken = (
  userId: string,
  email: string,
): string => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyEmailToken = async (
  token: string,
  userRepository: Repository<UserEntity>,
): Promise<void> => {
  try {
    // Verificar y decodificar el token JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findOne({
      where: { id: decoded.userId, email: decoded.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const currentTime = new Date();
    if (user.emailVerificationExpiresAt < currentTime) {
      throw new BadRequestException('Token has expired');
    }

    user.emailVerificationExpiresAt = new Date();
    user.verificationToken = null; // Limpiar el token de verificación después de usarlo
    await userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new BadRequestException('Invalid or expired token');
  }
};
