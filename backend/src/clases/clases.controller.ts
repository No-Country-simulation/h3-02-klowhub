import { Controller, Get, Post,Body } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesDto } from './dto/clases.dto';


@Controller('clases')
export class ClasesController {
        constructor(
            private readonly clasesService:ClasesService
        ){}

    @Get()
    async getClases(){
      const clase = await this.clasesService.getClases();
      return clase;
    }

    @Post()
    async PostClases(@Body() clase:ClasesDto){
        return await this.clasesService.postClases(clase);
    }
}
