import {
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { AccountEntity } from './accounts.entity';
import { UserRole } from './UserRole';

@Entity('users') // Nombre de la tabla en la base de datos
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') // ID único para cada usuario
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  password: string | null;

  @Column({ type: 'timestamp', nullable: true })
  emailVerificationExpiresAt: Date | null;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @Column({ type: 'varchar', nullable: true })
  title!: string | null;

  @Column({ type: 'varchar', nullable: true })
  biography!: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'number', nullable: true , default : 0 })
  reviws: number | null;

  @Column({ type: 'varchar', nullable: true , default : 0 })
  whyLearn: string | null;

  @Column({ type: 'number', nullable: true ,default : 0 })
  rating: number | null;

  @OneToMany(() => AccountEntity, (account) => account.user, {
    cascade: true,
  })
  accounts!: AccountEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  verificationToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  resetPasswordToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpiresAt: Date | null;
}
