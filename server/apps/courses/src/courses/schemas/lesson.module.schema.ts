import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Lesson extends Document {
  @Prop({ required: true })
  lessonTitle: string; // Título de la lección

  @Prop()
  lessonDescription?: string; // Descripción de la lección

  @Prop()
  materialUrl?: string; // URL del material

  @Prop()
  uploadedMaterial?: string; // Material subido

  @Prop()
  videoUrl?: string; // URL del video
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema()
export class Module extends Document {
  @Prop({ required: true })
  moduleTitle: string; // Título del módulo

  @Prop()
  moduleDescription?: string; // Descripción del módulo

  @Prop({ type: [Lesson], default: [] })
  lessons?: Lesson[]; // Lecciones del módulo
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
