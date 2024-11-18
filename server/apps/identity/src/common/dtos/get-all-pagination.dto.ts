import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllPaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  take: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip: number;
}
