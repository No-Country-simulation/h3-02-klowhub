import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Course } from '../schema/course.shema';

@Injectable()
export class SignaturesService {
  private storageClient = new Storage({ keyFilename: './gcckey.json' });
  private bucketName = 'klowhub-mediafiles';

  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>, 
  ) {}

  private extractTsFilename(line: string): string | null {
    if (line.startsWith('https://storage.googleapis.com/')) {
      const match = line.match(/\/([^/]+\.ts)/);
      return match ? match[1] : null;
    } else if (line.endsWith('.ts')) {
      return line;
    }
    return null;
  }

  async generateSignedUrls(courseID: string, moduleTitle: string, lessonTitle: string): Promise<any> {
    // Buscar el curso por su ID
    const course = await this.courseModel.findOne({ _id: courseID }).exec();
    if (!course) {
      throw new RpcException({
        message: `No se encontró el curso con el ID: ${courseID}`,
        code: status.NOT_FOUND,
      });
    }

    // Buscar el módulo dentro del curso por el título del módulo
    const module = course.modules.find((mod) => mod.moduleTitle === moduleTitle);
    if (!module) {
      throw new RpcException({
        message: `No se encontró el módulo con el título: ${moduleTitle} en el curso ${courseID}`,
        code: status.NOT_FOUND,
      });
    }

    // Buscar la lección dentro del módulo por el título de la lección
    const lesson = module.lessons.find((lesson) => lesson.lessonTitle === lessonTitle);
    if (!lesson) {
      throw new RpcException({
        message: `No se encontró la lección con el título: ${lessonTitle}`,
        code: status.NOT_FOUND,
      });
    }

    // Obtener la URL del video de la lección
    const videoUrl = lesson.videoUrl;
    if (!videoUrl) {
      throw new RpcException({
        message: 'La lección no tiene un archivo de video asociado',
        code: status.NOT_FOUND,
      });
    }

    const bucket = this.storageClient.bucket(this.bucketName);
    const blob = bucket.file(videoUrl);

    // Verificar si el archivo de video existe en el bucket
    const [exists] = await blob.exists();
    if (!exists) {
      throw new RpcException({
        message: `Archivo ${videoUrl} no encontrado`,
        code: status.NOT_FOUND,
      });
    }

    // Obtener la URL firmada para acceder al video
    const [signedUrl] = await blob.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 24 * 60 * 1000, // Expira en 24 horas
    });

    // Descargar el contenido del archivo M3U8 y generar URLs firmadas para los segmentos
    const [content] = await blob.download();
    const lines = content.toString('utf-8').split('\n');
    const baseDir = videoUrl.substring(0, videoUrl.lastIndexOf('/') + 1);

    const updatedLines: string[] = [];
    const tsSignedUrls: Record<string, string> = {};

    // Procesar los segmentos TS
    for (const line of lines) {
      const tsFilename = this.extractTsFilename(line);
      if (tsFilename) {
        const tsPath = `${baseDir}${tsFilename}`;
        const tsBlob = bucket.file(tsPath);
        const [tsExists] = await tsBlob.exists();

        if (tsExists) {
          const [tsSignedUrl] = await tsBlob.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 24 * 60 * 1000, // Expira en 24 horas
          });

          tsSignedUrls[tsFilename] = tsSignedUrl;
          updatedLines.push(tsSignedUrl);
        } else {
          updatedLines.push(line);
        }
      } else {
        updatedLines.push(line);
      }
    }

    return {
      m3u8: signedUrl,
      //segments: tsSignedUrls,
      updatedContent: updatedLines.join('\n'),
    };
  }
}