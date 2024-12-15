// src/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Temple_Reset_Password, Temple_Verific_Email } from './temple';
import { ConfigEnvs } from './../../config/envs';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ConfigEnvs.SMTP_HOST,
      port: parseInt(ConfigEnvs.SMTP_PORT, 10),
      secure: ConfigEnvs.SMTP_SECURE === 'true' as string, // true para SSL, false para TLS
      auth: {
        user: ConfigEnvs.SMTP_USER,
        pass: ConfigEnvs.SMTP_PASS,
      },
    });
  }
  async sendVerificationEmail(email: string, verificationToken: string) {
    const frontend = ConfigEnvs.FRONTEND_URL
    Logger.log(frontend)
    if (!frontend) {
      throw new Error('La variable de entorno FRONTEND no está definida');
    }

    const verificationLink = `${frontend}/verify?token=${verificationToken}`;
    const logoUrl =
      'https://res.cloudinary.com/ddv3ckyxa/image/upload/v1731885444/Logo_dzf5dh.png'; // Cambia por la URL de tu logo

    const mailOptions = Temple_Verific_Email({
      email,
      verificationLink,
      logoUrl,
    });

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Envía un correo para restablecer la contraseña del usuario.
   */
  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetLink = `${ConfigEnvs.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const logoUrl =
      'https://res.cloudinary.com/ddv3ckyxa/image/upload/v1731885444/Logo_dzf5dh.png'; // Cambia por la URL de tu logo

    const mailOptions = Temple_Reset_Password({
      email,
      resetLink,
      logoUrl,
    });

    await this.transporter.sendMail(mailOptions);
  }
}
