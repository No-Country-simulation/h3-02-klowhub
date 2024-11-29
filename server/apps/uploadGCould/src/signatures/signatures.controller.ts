import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignaturesService } from './signatures.service';

@Controller()
export class SignaturesController {
  constructor(private readonly signaturesService: SignaturesService) {}

  @GrpcMethod('SignaturesService', 'GenerateSignedUrls')
  async generateSignedUrls(data: { courseID: string, moduleTitle: string, lessonTitle: string }): Promise<any> {
    const { courseID, moduleTitle, lessonTitle } = data;
    console.log("a")
    if (!lessonTitle || !moduleTitle || !courseID) {
      throw new Error('Los parámetros moduleID y lessonTitle son requeridos');
    }


    return this.signaturesService.generateSignedUrls(courseID, moduleTitle, lessonTitle); 
  }
}