// src/entities/login-attempt.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('login_attempts')
export class LoginAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  ip: string;

  @Column()
  successful: boolean; // Indica si fue exitoso o fallido

  @CreateDateColumn()
  timestamp: Date; // Fecha del intento
}
