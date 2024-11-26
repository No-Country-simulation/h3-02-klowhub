import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
  createdCourses: Types.ObjectId[]; // Cursos creados por el usuario

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
  enrolledCourses: Types.ObjectId[]; // Cursos que el usuario está consumiendo

  @Prop({
    type: [
      {
        courseId: { type: Types.ObjectId, ref: 'Course' },
        moduleId: { type: Types.ObjectId, ref: 'Module' },
        lessonId: { type: Types.ObjectId, ref: 'Lesson' },
      },
    ],
    default: [],
  })
  progress: {
    courseId: Types.ObjectId;
    moduleId: Types.ObjectId;
    lessonId: Types.ObjectId;
  }[]; // Progreso por curso
}

export const UsersSchema = SchemaFactory.createForClass(Users);