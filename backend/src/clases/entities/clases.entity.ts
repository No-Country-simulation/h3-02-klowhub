import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cursos } from 'src/cursos/entities/cursos.entity';

@Entity()
export class Clase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @ManyToOne(() => Cursos, (curso) => curso.clases)
  curso: Cursos;

  @Column()
  courseId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  videoUrl: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  uploadDate: Date;
}