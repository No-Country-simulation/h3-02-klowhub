import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonDocument } from '../schema/lesson.schema';

@Injectable()
export class SignaturesService {
  private storageClient = new Storage({ keyFilename: './key.json' }); 
  private bucketName = 'klowhub-mediafiles';

  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<LessonDocument>,
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

  async generateSignedUrls(title: string): Promise<any> {
    const lesson = await this.lessonModel.findOne({ title }); 
    if (!lesson) {
      throw new HttpException(
        `No se encontró la lección con el título: ${title}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const m3u8Path = lesson.videos;
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