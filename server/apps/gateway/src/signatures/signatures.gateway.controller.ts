import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

interface SignaturesServiceGrpc {
  generateSignedUrls(data: { courseID: string, moduleTitle: string, lessonTitle: string }): Observable<any>;
}

@Controller('signatures')
export class SignaturesController {
  @Inject('SIGNATURES_SERVICE') 
  private readonly client: ClientGrpc;

  private signaturesService: SignaturesServiceGrpc;


  onModuleInit() {
    this.signaturesService = this.client.getService<SignaturesServiceGrpc>('SignaturesService');
  }

 
  @Post('signed-urls')
  async generateSignedUrls(@Body() data: { courseID: string, moduleTitle: string, lessonTitle: string }): Promise<any> {
    const { lessonTitle, moduleTitle, courseID } = data;

    if (!lessonTitle || !moduleTitle || !courseID) {
      throw new HttpException('El parámetro "title" es requerido', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.signaturesService.generateSignedUrls({ courseID, moduleTitle, lessonTitle });
      return result; 
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error occurred',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}