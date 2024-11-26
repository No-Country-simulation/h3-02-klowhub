import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { GoogleCloudStorageService } from './storage.service';
import { UploadFileRequest, UploadFileResponse } from './interfaces/storage.interface';

@Controller()
export class StorageController {
  constructor(private readonly googleCloudStorageService: GoogleCloudStorageService) {}

  @GrpcMethod('GoogleCloudStorageService', 'UploadFile')
  async uploadFile(
    data: UploadFileRequest,
  ): Promise<UploadFileResponse> {
    try {
      return await this.googleCloudStorageService.uploadFile(data);
    } catch (err) {
      throw new RpcException('Error al cargar el archivo: ' + err.message);
    }
  }
}