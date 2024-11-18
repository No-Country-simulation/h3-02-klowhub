import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as express from 'express';
import { firstValueFrom } from 'rxjs';

import { IdentityService } from 'src/identity/identity.models';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly identityService: IdentityService) {}

  async use(req: express.Request, res: express.Response, next: express.NextFunction) {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      // Verificar la validez del token de acceso
      const decoded = await firstValueFrom(this.identityService.VerifyToken(accessToken));
      if(!decoded.isValid) {
        throw new UnauthorizedException('Invalid access token');
      }
      req.user ={ id: decoded.id || "" }; 
      next();
    } catch (err) {
      if (err instanceof Error && err.name === 'TokenExpiredError') {
        // Refrescar el token si es necesario
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token is missing');
        }

        try {
          const origin = req.headers.values["origin"];
          const newTokens = await firstValueFrom(this.identityService.RefreshAccess({refreshToken, origin}))
          res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
          res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });
          req.user = newTokens.user;
          next();
        } catch (refreshError) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      } else {
        throw new UnauthorizedException('Invalid access token');
      }
    }
  }
}