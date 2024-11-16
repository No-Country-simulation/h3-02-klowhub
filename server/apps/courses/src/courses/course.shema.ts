import { Schema, Document } from 'mongoose';

export const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // Otros campos aquí
});

export interface Course extends Document {
  id: string;
  name: string;
  description: string;
}
