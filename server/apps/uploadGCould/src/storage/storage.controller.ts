import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { StorageService } from './storage.service';
import { UploadFileRequest, UploadFileResponse } from './interfaces/storage.interface';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @GrpcMethod('storageService', 'UploadFile')
  async uploadFile(
    data: UploadFileRequest,
  ): Promise<UploadFileResponse> {
    try {
      return await this.storageService.uploadFile(data);
    } catch (err) {
      throw new RpcException('Error al cargar el archivo: ' + err.message);
    }
  }
}