import {Post, Controller, Get, Body } from '@nestjs/common';
import { SuscriptoService } from './suscripto.service';
import { SuscritoDto } from './dto/suscrito.dto';

@Controller('suscripto')
export class SuscriptoController {
    constructor(private readonly suscriptoService: SuscriptoService) {}

    @Get()
    async getSuscritos(){
        return await this.suscriptoService.getSuscritos();
    }

    @Post()
    async postSuscripto(@Body() suscrito:SuscritoDto){
      const su = await this.suscriptoService.postSuscripto(suscrito);
      return su;
    }



}
