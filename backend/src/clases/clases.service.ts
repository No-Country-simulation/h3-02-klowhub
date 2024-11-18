import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clases } from './entities/clases.entity';

@Injectable()
export class ClasesService {
    constructor(
      @InjectRepository(Clases) private clasesRepository: Repository<Clases>
    ){}

    async getClases(){
        return this.clasesRepository.find()
    }

    async postClases(clase){
            return this.clasesRepository.save(clase);
    }

    
}
