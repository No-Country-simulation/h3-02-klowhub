import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cursos } from 'src/cursos/entities/cursos.entity';

@Entity()
export class Clases {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
  courseId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  videoUrl: string;

  @Column()
  multimedia: string;

  @Column()
  reseña: string;

  @Column()
  uploadDate: string;

  @ManyToOne(() => Cursos, (curso) => curso.clases)
  curso: Cursos;
}