import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptions } from '../../domain/models/jwtOptions.model';
import {
  JsonWebTokenError,
  JwtService,
  JwtSignOptions,
  TokenExpiredError,
} from '@nestjs/jwt';
import {
  AccessPayload,
  AccessToken,
  EmailPayload,
  EmailToken,
  RefreshPayload,
  RefreshToken,
} from '../../domain/models/token.model';
import { IDENTITY_ERRORS } from '../../domain/constants/messages';
import { TokenTypeEnum } from '../../domain/enums/tokenTypes.enum';
import { User } from '../../domain/models/user.domain';
import { CustomJwtService } from '../../domain/ports/jwt.service';
import { CommonService } from '@common/interfaces/common.service';
import { RpcException } from '@nestjs/microservices';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class JwtServiceAdapter extends CustomJwtService {
  private readonly jwtConfig: JwtOptions;
  private readonly issuer: string;
  private readonly domain: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
    private readonly jwt: JwtService,
  ) {
    super();
    this.jwtConfig = this.configService.get<JwtOptions>('jwt');
    this.issuer = this.configService.get<string>('APP_ID');
    this.domain = this.configService.get<string>('APP_DOMAIN');
  }

  protected async generateTokenAsync(
    payload: AccessPayload | EmailPayload | RefreshPayload,
    options: Parameters<JwtService['sign']>[1],
  ): Promise<string> {
    return this.jwt.signAsync(payload, options);
  }
  protected async verifyTokenAsync<T extends object>(
    token: string,
    options: Parameters<JwtService['verifyAsync']>[1],
  ): Promise<T> {
    return this.jwt.verifyAsync<T>(token, options);
  }

  protected async throwBadRequest<
    T extends AccessToken | RefreshToken | EmailToken,
  >(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const metadata = new Metadata();
        metadata.add("statusCode", "400");
        metadata.add("description", "Error en throwBadRequest en JWT Service");
        throw new RpcException({
          message: IDENTITY_ERRORS.USER_TOKEN_EXPIRED,
          statusCode: 400,   
          service: 'IdentityService',  
          metadata
        });
      }
      if (error instanceof JsonWebTokenError) {
        const metadata = new Metadata();
        metadata.add("statusCode", "400");
        metadata.add("description", "Error en throwBadRequest en JWT Service");
        throw new RpcException({
          message: IDENTITY_ERRORS.USER_TOKEN_INVALID,
          statusCode: 400,   
          service: 'IdentityService',  
          metadata  
        });
      }
      const metadata = new Metadata();
      metadata.add("statusCode", "500");
      metadata.add("description", "Error en throwBadRequest en JWT Service");
      throw new RpcException({
        message: "Unknown error",
        statusCode: 500,   
        service: 'IdentityService',  
        metadata  
      });
    }
  }
  public async generateToken(
    user: User,
    tokenType: TokenTypeEnum,
    domain?: string | null,
    tokenId?: string,
  ): Promise<string> {
    const jwtOptions: JwtSignOptions = {
      issuer: this.issuer,
      subject: user.email,
      audience: domain ?? this.domain,
      algorithm: 'HS256',
    };

    switch (tokenType) {
      case TokenTypeEnum.ACCESS:
        const { secret: accessSecret, time: accessTime } =
          this.jwtConfig.access;
        return this.commonService.throwInternalError(
          this.generateTokenAsync(
            { id: user.id },
            {
              ...jwtOptions,
              expiresIn: accessTime,
              secret: accessSecret,
            },
          ),
        );
      case TokenTypeEnum.REFRESH:
        const { secret: refreshSecret, time: refreshTime } =
          this.jwtConfig.refresh;
        return this.commonService.throwInternalError(
          this.generateTokenAsync(
            {
              id: user.id,
              version: user.credentials.version,
              tokenId: tokenId ?? crypto.randomUUID(),
            },
            {
              ...jwtOptions,
              expiresIn: refreshTime,
              secret: refreshSecret,
            },
          ),
        );
      case TokenTypeEnum.CONFIRMATION:
      case TokenTypeEnum.RESET_PASSWORD:
        const { secret, time } = this.jwtConfig[tokenType];
        return this.commonService.throwInternalError(
          this.generateTokenAsync(
            { id: user.id, version: user.credentials.version },
            {
              ...jwtOptions,
              expiresIn: time,
              secret,
            },
          ),
        );
    }
  }

  public async verifyToken<T extends AccessToken | RefreshToken | EmailToken>(
    token: string,
    tokenType: TokenTypeEnum,
  ): Promise<T> {
    const { secret, time } = this.jwtConfig[tokenType];
    return this.throwBadRequest(
      this.verifyTokenAsync(token, {
        issuer: this.issuer,
        audience: new RegExp(this.domain),
        maxAge: time,
        algorithms: ['HS256'],
        secret,
      }),
    );
  }

  public async generateAuthTokens(
    user: User,
    domain?: string,
    tokenId?: string,
  ): Promise<[string, string]> {
    return Promise.all([
      this.generateToken(user, TokenTypeEnum.ACCESS, domain, tokenId),
      this.generateToken(user, TokenTypeEnum.REFRESH, domain, tokenId),
    ]);
  }
}
