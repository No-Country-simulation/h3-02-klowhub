import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    // ManyToOne, 
    // OneToOne 
} from 'typeorm';
// import { Users } from 'src/users/entities/users.entity';
// import { Cursos } from 'src/cursos/entities/cursos.entity';


@Entity({
  name: 'suscribe',
})
export class Suscrito {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    courseId: string;
    @Column()
    userId: string;
    @Column()
    progreso: string;
 

 // En Curso.entity
// @ManyToOne(() => Suscrito, (suscrito) => suscrito.Cursos)
// suscriptores: Suscrito[];

// En Usuario.entity
// @ManyToOne(() => Suscrito, (suscrito) => suscrito.users)
// suscripciones: Suscrito[];
}