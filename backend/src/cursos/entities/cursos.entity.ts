import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';

@Entity()
export class Cursos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  

  @Column()
  userId: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['video', 'course'], default: 'video' })
  contentType: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  uploadDate: Date;

  @Column({ default: 0 })
  qualityScore: number;

  @Column()
  clases: string;

  @ManyToOne(() => Users, (user) => user.cursos)
  user: Users;
}