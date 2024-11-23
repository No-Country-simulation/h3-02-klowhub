import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Module } from './lesson.module.schema'; // Importamos el subesquema de módulos
import { MergeInfo, MergeInfoSchema } from './merge-info.schema'; // Importamos el subesquema de mergeInfo

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
  contentType: string; // Tipo de contenido: gratuito o premium

  @Prop({
    type: String,
    enum: ['appsheet', 'powerapps'],
    required: true,
  })
  courseType: string; // Tipo de curso: appsheet o powerapps

  @Prop({
    type: String,
    enum: ['course', 'lesson'],
    required: true,
  })
  kind: string; // Indica si es un curso o lección

  @Prop()
  basicDescription?: string; // Descripción básica del curso

  @Prop({ type: [String] })
  prerequisites?: string[]; // Requisitos previos del curso

  @Prop()
  detailedContent?: string; // Descripción detallada del contenido

  @Prop()
  imageUrl?: string; // URL de la imagen del curso

  @Prop({ type: [Module], default: [] })
  modules?: Module[]; // Lista de módulos del curso

  @Prop({ type: MergeInfoSchema })
  mergeInfo?: MergeInfo; // Información sobre fusiones con otras apps o cursos

  @Prop({ default: 'in-progress' })
  status: string; // Estado del curso

  @Prop({ default: Date.now })
  createdAt: Date; // Fecha de creación

  @Prop({ default: Date.now })
  updatedAt: Date; // Fecha de última actualización
}

export const CourseSchema = SchemaFactory.createForClass(Course);
