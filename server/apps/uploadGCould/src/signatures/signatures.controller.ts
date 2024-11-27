import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignaturesService } from './signatures.service';

@Controller()
export class SignaturesController {
  constructor(private readonly signaturesService: SignaturesService) {}

  @GrpcMethod('SignaturesService', 'GenerateSignedUrls')
  async generateSignedUrls(data: { title: string }): Promise<any> {
    const { title } = data;
    console.log("a")
    if (!title) {
      throw new Error('Los parámetros moduleId y lessonTitle son requeridos');
    }


    return this.signaturesService.generateSignedUrls(title);
  }
}