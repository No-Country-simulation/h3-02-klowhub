import { Entity, Column,PrimaryGeneratedColumn, PrimaryColumn, OneToOne } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
@Entity()
export class Reputation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @OneToOne(() => Users, (user) => user.reputation)
  user: Users;

  @Column({ default: 0 })
  reputationScore: number;
}