export interface UploadFileRequest {
    filename: string;
    file: Buffer;
    userId: string;
  }
  
  export interface UploadFileResponse {
    url: string;
    message: string;
  }