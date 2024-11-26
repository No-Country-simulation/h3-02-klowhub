// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Temple_Reset_Password, Temple_Verific_Email } from './temple';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true', // true para SSL, false para TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendVerificationEmail(email: string, verificationToken: string) {
    const verificationLink = `${process.env.FRONTEND}/verify?token=${verificationToken}`;
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
    const resetLink = `${process.env.FRONTEND}/reset-password?token=${resetToken}`;
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
