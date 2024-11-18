import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Suscrito } from './entities/suscrito.entity';

@Injectable()
export class SuscriptoService {
    constructor(
        @InjectRepository(Suscrito) private suscritoRepository:Repository<Suscrito>,
    ){}

    async getSuscritos(){
        return await this.suscritoRepository.find();
    }

    async postSuscripto(suscri:Suscrito){
        return await this.suscritoRepository.save(suscri);
    }


}
