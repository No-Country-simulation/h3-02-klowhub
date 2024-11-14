import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Users } from 'src/users/entities/users.entity';
@Entity()
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string;



  @Column()
  contentId: number;



  @Column()
  userId: number;

  @Column()
  score: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  ratingDate: Date;
}