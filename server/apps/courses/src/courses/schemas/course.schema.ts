import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Module, ModuleSchema } from './module.schema';
import { MergeInfo, MergeInfoSchema } from './merge-info.schema';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  userId: string; // ID del usuario creador

  @Prop({ required: true })
  title: string; // Título del curso o lección

  @Prop({
    type: String,
    enum: ['free', 'premium'],
    default: 'premium',
    required: true,
  })
  contentType: string; // Tipo de contenido

  @Prop({
    type: String,
    enum: ['appsheet', 'powerapps'],
    required: true,
  })
  courseType: string; // Tipo de curso

  @Prop({
    type: String,
    enum: ['course', 'lesson'],
    required: true,
  })
  kind: string; // Curso o lección

  @Prop()
  basicDescription?: string; // Descripción básica del curso

  @Prop({ type: [String] })
  prerequisites?: string[]; // Requisitos previos del curso

  @Prop()
  detailedContent?: string; // Descripción detallada

  @Prop()
  imageUrl?: string; // URL de la imagen del curso

  @Prop({ type: [ModuleSchema], default: [] })
  modules?: Module[]; // Lista de módulos

  @Prop({ type: MergeInfoSchema })
  mergeInfo?: MergeInfo; // Información de fusiones

  @Prop({ default: 'in-progress' })
  status: string; // Estado del curso

  @Prop({ default: Date.now })
  createdAt: Date; // Fecha de creación

  @Prop({ default: Date.now })
  updatedAt: Date; // Fecha de actualización
}

export const CourseSchema = SchemaFactory.createForClass(Course);