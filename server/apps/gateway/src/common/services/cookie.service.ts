import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  set(
    res: Response,
    name: string,
    value: string,
    options: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: 'strict' | 'lax' | 'none';
      maxAge: number;
    },
  ): void {
    res.cookie(name, value, {
      httpOnly: options.httpOnly,
      secure: options.secure,
      sameSite: options.sameSite,
      maxAge: options.maxAge,
    });
  }
}
