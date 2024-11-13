import { Users } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Content {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @ManyToOne(() => Users, (user) => user.content)
  user:Users;

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
  ratings: string;

}


