import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cursos } from './entities/cursos.entity';

@Injectable()
export class CursosService {
    constructor(       
        @InjectRepository(Cursos) private cursosRepository: Repository<Cursos>,
      ) {}

      async getCursos() {
        const cursos = await this.cursosRepository.find();         
       console.log('los cursos aqui ' + cursos);
        return cursos;
      }

      async createCursos(cursos){
        const newCurso = await this.cursosRepository.save(cursos);
        return newCurso;
      }
}
