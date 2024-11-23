import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MergeInfo extends Document {
  @Prop({ type: Number, required: false })
  discountPercentage?: number; // Porcentaje de descuento

  @Prop({ type: [String], required: false })
  relatedCourses?: string[]; // IDs de cursos relacionados
}

export const MergeInfoSchema = SchemaFactory.createForClass(MergeInfo);
