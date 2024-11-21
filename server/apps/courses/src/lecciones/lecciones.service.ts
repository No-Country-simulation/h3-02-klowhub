import { Injectable } from '@nestjs/common';
import { CreateLeccioneDto } from './dto/create-leccione.dto';
import { UpdateLeccioneDto } from './dto/update-leccione.dto';

@Injectable()
export class LeccionesService {
  constructor()
  create(createLeccioneDto: CreateLeccioneDto) {
    return 'This action adds a new leccione';
  }

  findAll() {
    return `This action returns all lecciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leccione`;
  }

  update(id: number, updateLeccioneDto: UpdateLeccioneDto) {
    return `This action updates a #${id} leccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} leccione`;
  }
}
