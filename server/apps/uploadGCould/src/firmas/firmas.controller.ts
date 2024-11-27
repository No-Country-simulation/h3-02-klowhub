import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FirmasService } from './firmas.service';

@Controller()
export class FirmasController {
  constructor(private readonly firmasService: FirmasService) {}

  @GrpcMethod('FirmasService', 'GenerateSignedUrls')
  async generateSignedUrls(data: { moduleId: string; lessonTitle: string }): Promise<any> {
    const { moduleId, lessonTitle } = data;

    if (!moduleId || !lessonTitle) {
      throw new Error('Los parámetros moduleId y lessonTitle son requeridos');
    }


    return this.firmasService.generateSignedUrls(moduleId, lessonTitle);
  }
}