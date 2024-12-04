import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Lesson {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

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
