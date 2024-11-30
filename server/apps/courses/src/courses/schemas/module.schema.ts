// module.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Lesson {
  @Prop({ required: true })
  lessonTitle: string;

  @Prop()
  lessonDescription?: string;

  @Prop()
  materialUrl?: string;

  @Prop()
  uploadedMaterial?: string;

  @Prop()
  videoUrl?: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema()
export class Modules {
  
  @Prop({ required: true , unique: true })
  moduleTitle: string;

  @Prop()
  moduleDescription?: string;

  @Prop({ type: [LessonSchema], default: [] })
  lessons?: Lesson[];
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);
