// module.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Lesson, LessonSchema } from './lesson.module.schema';

@Schema()
export class Modules {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true })
  moduleTitle: string;

  @Prop()
  moduleDescription?: string;


  @Prop({ type: [LessonSchema], default: [] })
  lessons?: Lesson[];
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);
