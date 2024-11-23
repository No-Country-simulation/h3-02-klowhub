import { PartialType } from '@nestjs/mapped-types';
import { CreateLeccioneDto } from './create-leccione.dto';

export class UpdateLeccioneDto extends PartialType(CreateLeccioneDto) {}
