import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from '../schema/module.schema';

@Injectable()
export class FirmasService {
  private storageClient = new Storage({ keyFilename: './key.json' });
  private bucketName = 'klowhub-mediafiles';

  constructor(
    @InjectModel('Module') private readonly moduleModel: Model<Module>,  
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

  async generateSignedUrls(moduleId: string, lessonTitle: string): Promise<any> {
    // 1. Buscar el módulo con las lecciones
    const module = await this.moduleModel.findById(moduleId).exec();
    if (!module) {
      throw new Error(`No se encontró el módulo con el ID: ${moduleId}`);
    }


    const lesson = module.lessons.find((lesson) => lessonTitle === lessonTitle);
    if (!lesson) {
      throw new Error(`No se encontró la lección con el titel: ${lessonTitle}`);
    }


    const m3u8Path = lesson.videoUrl;
    if (!m3u8Path) {
      throw new Error(`La lección no tiene un video asociado`);
    }

    const bucket = this.storageClient.bucket(this.bucketName);
    const blob = bucket.file(m3u8Path);

    const [exists] = await blob.exists();
    if (!exists) {
      throw new HttpException(
        `Archivo ${m3u8Path} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const [m3u8SignedUrl] = await blob.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 24 * 60 * 1000, // Expira en 24 horas
    });

    const [content] = await blob.download();
    const lines = content.toString('utf-8').split('\n');
    const baseDir = m3u8Path.substring(0, m3u8Path.lastIndexOf('/') + 1);

    const updatedLines: string[] = [];
    const tsSignedUrls: Record<string, string> = {};

    for (const line of lines) {
      const tsFilename = this.extractTsFilename(line);
      if (tsFilename) {
        const tsPath = `${baseDir}${tsFilename}`;
        const tsBlob = bucket.file(tsPath);
        const [tsExists] = await tsBlob.exists();

        if (tsExists) {
          const [signedUrl] = await tsBlob.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 24 * 60 * 1000, // Expira en 24 horas 
          });

          tsSignedUrls[tsFilename] = signedUrl;
          updatedLines.push(signedUrl); 
        } else {
          updatedLines.push(line); 
        }
      } else {
        updatedLines.push(line); 
      }
    }

    return {
      m3u8: m3u8SignedUrl,
      segments: tsSignedUrls,
      updatedContent: updatedLines.join('\n'),
    };
  }
}