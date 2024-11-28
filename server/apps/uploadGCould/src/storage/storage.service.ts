import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { UploadFileRequest, UploadFileResponse } from './interfaces/storage.interface';

@Injectable()
export class StorageService {
  private readonly storage: Storage;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const projectId = this.configService.get<string>('PROJECT_ID');
    this.bucketName = this.configService.get<string>('BUCKET_NAME');
    this.storage = new Storage({
      projectId,
      keyFilename: 'gccKey.json',
    });
  }
  
  async uploadFile(request: UploadFileRequest): Promise<UploadFileResponse> {
    const { file, filename, userId } = request;
    console.log(this.bucketName,userId);
    if (!file) {
        throw new RpcException({
            message: 'Archivo no proporcionado o es inválido',
            statusCode: 400,
          });
    }

    const bucket = this.storage.bucket(this.bucketName);
    console.log(bucket);
    const uniqueFileName = `courses/raw/${Date.now()}-${filename}`;
    console.log(uniqueFileName);
    const blob = bucket.file(uniqueFileName);
    console.log(blob);

    try {
      await blob.save(file);
      const url = `https://storage.cloud.google.com/${this.bucketName}/${uniqueFileName}`;
      console.log(url);
      return { url, message: 'Archivo subido exitosamente' };
    } catch (err) {
      throw new RpcException(err.message || 'Error al subir el archivo');
    }
  }
}