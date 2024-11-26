import { Controller, Post, UploadedFile, UseInterceptors, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

interface GoogleCloudStorageService  {
  uploadFile(data: { filename: string; file: Buffer }): Observable<{ url: string }>;
}

@Controller('upload')
export class UploadController {
  private googleCloudStorageService : GoogleCloudStorageService ;

  constructor(@Inject('UPLOAD_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.googleCloudStorageService  = this.client.getService<GoogleCloudStorageService >('GoogleCloudStorageService');
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Asegúrate de que 'file' sea el nombre del campo
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      console.error('No file uploaded');
      throw new Error('No file uploaded');
    }

    console.log('Archivo recibido:', file); // Muestra el archivo recibido
    const { originalname: filename, buffer: fileBuffer } = file;

    return this.googleCloudStorageService.uploadFile({
      filename,
      file: fileBuffer,
    });
  }
}