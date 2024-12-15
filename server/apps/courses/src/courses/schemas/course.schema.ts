import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Modules, ModulesSchema } from './module.schema';
import { MergeInfo, MergeInfoSchema } from './merge-info.schema';
import { Funtionalidad, Idiom, Pilar, Platform, Sector, Tool } from './enums';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  userId: string; // ID del usuario creador

  @Prop({ required: true })
  title: string; // Título del curso o lección
   
  @Prop({
    type: String,
    enum: ['free', 'premium'],
    default: 'premium',
  })
  contentType: string; // Tipo de contenido

  @Prop({
    type: String,
    enum: ['course', 'lesson'],
    default: 'course',
  })
  kind: string; // Curso o lección

  @Prop()
  basicDescription?: string; // Descripción básica del curso

  @Prop()
  type: string;
  enum : ['basic', 'intermed']
  level : string

  @Prop({
    type: String,
    enum: Object.values(Platform),
    default: Platform.NONE,
  })
  platform: string;

  @Prop({
    type: String,
    enum: Idiom,
    default: Idiom.NONE,
  })
  idiom: string;

  @Prop({
    type: String,
    default: 0,
  })
  reviews: string;
  
  @Prop({
    type: String,
    default: 0,
  })
  rating: string;

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


  @Prop()
  purpose? : string // descripcion mas completa

  @Prop({ type: [String] })
  prerequisites?: string[]; // Requisitos previos del curso

  @Prop({ type: [String] })
  followUp?: string[]; // depues del curso

  @Prop({ type: [String] })
  contents?: string[]; // para quein es

  @Prop()
  detailedContent?: string; // Descripción detallada *Acerca de este curso*

  @Prop()
  imageUrl?: string; // URL de la imagen del curso

  // tercer paso 

  @Prop({ type: [ModulesSchema], default: [] })
  modules?: Modules[]; // Lista de módulos

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
