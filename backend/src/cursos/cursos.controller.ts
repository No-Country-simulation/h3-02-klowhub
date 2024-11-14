import { Controller, Get,Post,Body } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosDto } from './dto/cursos.dto';

@Controller('cursos')
export class CursosController {
    constructor(
        private readonly cursoService: CursosService
    ) {}

    @Get()
    getCursos(){
        return this.cursoService.getCursos();
    }

  @Post()
  
  createCursos( @Body() cursos: CursosDto  ) {
    // const modifiUsers = { ...users, createdAt: request.now };
     return this.cursoService.createCursos(cursos); 
  }

}
