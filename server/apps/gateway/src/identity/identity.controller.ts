import {
  Body,
  Controller,
  Inject,
  type OnModuleInit,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import type {
  ConfirmEmailRequest,
  IdentityService,
  LogoutRequest,
  RefreshRequest,
  SigninRequest,
  SignupRequest,
} from './identity.models';
import { firstValueFrom } from 'rxjs';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('v1/identity')
export class IdentityController implements OnModuleInit {
  private identityService: IdentityService;
  private readonly testing: boolean;
  private readonly refreshTime: number;
  private readonly accessTime: number;

  constructor(
    @Inject('IDENTITY_PACKAGE') private client: microservices.ClientGrpc,
    private readonly config: ConfigService,
  ) {
    this.testing = this.config.get<boolean>('testing');
    this.refreshTime = this.config.get<number>('REFRESH_TIME');
    this.accessTime = this.config.get<number>('ACCESS_TIME');
  }

  onModuleInit() {
    this.identityService =
      this.client.getService<IdentityService>('IdentityService');
  }

  @Post('/signup')
  public async signup(
    @Req() req: express.Request,
    @Res() res: express.Response,
    @Body() body: SignupRequest,
  ) {
    const origin = req.headers.origin;
    body.origin = origin;
    const data = await firstValueFrom(this.identityService.Signup(body));
    //TODO: Si no fuera necesario validar el email actualizar la respuesta del serivicio
    //Para que genere token de acceso y refresco y en este punto guardarlos en cookies
    return data;
  }

  @Post('/signin')
  public async signin(
    @Req() req: express.Request,
    @Res() res: express.Response,
    @Body() body: SigninRequest,
  ) {
    const origin = req.headers.origin;
    body.origin = origin;
    const { accessToken, refreshToken, user } = await firstValueFrom(
      this.identityService.Signin(body),
    );
    this.saveTokens(res, accessToken, refreshToken).status(200).send({ user });
  }

  @Post('/refresh')
  public async refreshAccess(
    @Req() req: express.Request,
    @Res() res: express.Response,
    @Body() body: RefreshRequest,
  ) {
    const origin = req.headers.origin;
    body.origin = origin;
    const { accessToken, refreshToken, user } = await firstValueFrom(
      this.identityService.RefreshAccess(body),
    );

    this.saveTokens(res, accessToken, refreshToken).status(200).send({ user });
  }

  @Post('/logout')
  public async logout(@Body() body: LogoutRequest) {
    await this.identityService.Logout(body);
    return { message: 'User logout', success: true };
  }

  @Post('/confirm-email')
  public async confirmEmail(
    @Req() req: express.Request,
    @Res() res: express.Response,
    @Body() body: ConfirmEmailRequest,
  ) {
    const origin = req.headers.origin;
    body.origin = origin;
    const { accessToken, refreshToken, user } = await firstValueFrom(
      this.identityService.ConfirmEmail(body),
    );

    this.saveTokens(res, accessToken, refreshToken).status(200).send({ user });
  }

  private saveTokens(
    res: express.Response,
    refreshToken: string,
    accessToken: string,
  ): express.Response {
    const now = new Date().getTime();
    return res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: !this.testing,
        path: '/',
        sameSite: 'lax',
        expires: new Date(now + this.accessTime),
        maxAge: now + this.accessTime,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: !this.testing,
        path: '/',
        sameSite: 'lax',
        expires: new Date(now + this.refreshTime),
        maxAge: now + this.refreshTime,
      })
      .header('Content-Type', 'application/json');
  }
}
