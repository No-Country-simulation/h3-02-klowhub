// merge-info.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MergeInfo extends Document {
  @Prop()
  discountPercentage?: number; // Porcentaje de descuento

  @Prop({ type: [String], default: [] })
  relatedCourses?: string[]; // IDs de cursos relacionados
}

export const MergeInfoSchema = SchemaFactory.createForClass(MergeInfo);
