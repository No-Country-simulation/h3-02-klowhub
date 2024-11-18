
import { Cursos } from 'src/cursos/entities/cursos.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
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

  @OneToMany(() => Cursos, (curso) => curso.userId)
  curso: Cursos[];

}