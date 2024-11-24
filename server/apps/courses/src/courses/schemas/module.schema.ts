// module.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
export class Module {
  @Prop({ required: true })
  moduleTitle: string;

  @Prop()
  moduleDescription?: string;

  @Prop({ type: [LessonSchema], default: [] })
  lessons?: Lesson[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
