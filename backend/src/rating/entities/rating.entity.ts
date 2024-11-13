import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Content } from 'src/content/entities/content.entity';
import { Users } from 'src/users/entities/users.entity';
@Entity()
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @ManyToOne(() => Content, (content) => content.ratings)
  content: Content;

  @Column()
  contentId: number;

  @ManyToOne(() => Users, (user) => user.ratings)
  user: Users;

  @Column()
  userId: number;

  @Column()
  score: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  ratingDate: Date;
}