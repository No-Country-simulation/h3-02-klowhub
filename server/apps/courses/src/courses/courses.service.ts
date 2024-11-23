import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(data: any) {
    const newCourse = new this.courseModel(data);
    return newCourse.save();
  }
}
  //constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }

  // async createCourse(data: { title: string; description?: string }) {
  //   const newCourse = new this.courseModel(data);
  //   return newCourse.save();
  // }

  // async getAllCourses() {
  //   return this.courseModel.find().exec();
  // }

  // async getCourse(){
  //   return this.courseModel.find();
  // }
  // async getCourseId(id){
  //   return await this.courseModel.findById(id);
  // }

  //   // Método para crear un curso
  //   async create(createCourseDto: CreateCourseDto): Promise<Course> {
  //     const course = new this.courseModel(createCourseDto);  // Usa el DTO para crear el curso
  //     return course.save();  // Guarda el curso en la base de datos
  //   }