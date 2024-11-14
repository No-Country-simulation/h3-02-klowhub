
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  
} from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

 
  @Column()
  cursos:  string | undefined;
 

  @Column({ default: 0 })
  reputation: string;
  

  @Column()
  createdAt: string | undefined;

 

}