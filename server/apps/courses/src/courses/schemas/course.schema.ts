import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Module, ModuleSchema } from './module.schema';
import { MergeInfo, MergeInfoSchema } from './merge-info.schema';
import { Funtionalidad, Idiom, Pilar, Platform, Sector, Tool } from './enums';

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
    enum: ['course', 'lesson'],
  })
  kind: string; // Curso o lección

  @Prop()
  basicDescription?: string; // Descripción básica del curso

  @Prop()
  type: string;
  enum : ['basic', 'intermed']

  @Prop({
    type: String,
    enum: Platform,
    default: Platform.NONE,
  })
  platafor: string;

  @Prop({
    type: String,
    enum: Idiom,
    default: Idiom.NONE,
  })
  idiom: string;

  @Prop({
    type: String,
    enum: Pilar,
    default: Pilar.NONE,
  })
  pilar: string;

  @Prop({
    type: String,
    enum: Funtionalidad,
    default: Funtionalidad.NONE,
  })
  funtionalidad: string;

  @Prop({
    type: String,
    enum: Sector,
    default: Sector.NONE,
  })
  sector :string;

  @Prop({
    type: String,
    enum: Tool,
    default: Tool.NONE,
  })
  tool : string;

  // detalles del curso

  @Prop()
  descriptionBasic? : string // descripcion basica

  @Prop({ type: [String] })
  prerequisites?: string[]; // Requisitos previos del curso

  @Prop()
  detailedContent?: string; // Descripción detallada

  @Prop()
  imageUrl?: string; // URL de la imagen del curso

  // tercer paso 

  @Prop({ type: [ModuleSchema], default: [] })
  modules?: Module[]; // Lista de módulos

  @Prop({ type: MergeInfoSchema })
  mergeInfo?: MergeInfo; // Información de fusiones

  @Prop({ default: 'in-progress' })
  status: string; // Estado del curso

  // listado de usuario que estan en este curso
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }], default: [] })
  enrolledUsers: Types.ObjectId[]; // Usuarios inscritos en el curso

  @Prop({ default: Date.now })
  createdAt: Date; // Fecha de creación

  @Prop({ default: Date.now })
  updatedAt: Date; // Fecha de actualización
}

export const CourseSchema = SchemaFactory.createForClass(Course);
