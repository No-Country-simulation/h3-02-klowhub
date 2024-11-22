import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeccionesService } from './lecciones.service';
import { CreateLeccioneDto } from './dto/create-leccione.dto';
import { UpdateLeccioneDto } from './dto/update-leccione.dto';

@Controller('lecciones')
export class LeccionesController {
  constructor(private readonly leccionesService: LeccionesService) {}

  @Post()
  create(@Body() createLeccioneDto: CreateLeccioneDto) {
    return this.leccionesService.create(createLeccioneDto);
  }

  @Get()
  findAll() {
    return this.leccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeccioneDto: UpdateLeccioneDto) {
    return this.leccionesService.update(+id, updateLeccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leccionesService.remove(+id);
  }
}
