import { Schema, Document } from 'mongoose';

export const LeccionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createAt:{type: Date, required: true,default:Date.now()},
    updateAt:{type: Date, required: true,default:Date.now()},
    cursoId:{type: String, required:true},
    videos:{type:String},    
    multimedia:{type:String},
    reseña:{type:String},    
  });
  
  export interface Leccion extends Document {
    id: string;
    title: string;
    description: string;
    cursoId:string;    
    videos:string;
    multimedia:string;
    reseña:string;    
  }