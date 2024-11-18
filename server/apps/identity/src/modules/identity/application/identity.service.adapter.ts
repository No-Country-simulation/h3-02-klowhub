import {
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { compare, hash } from 'bcrypt';
import { UUID } from 'crypto';

import { isEmpty } from '@configuration/utils/validations';

import { IDENTITY_ERRORS } from '../domain/constants/messages';
import { AuthProvidersEnum } from '../domain/enums/authProvider.enum';
import { TokenTypeEnum } from '../domain/enums/tokenTypes.enum';
import { AuthResult } from '../domain/models/authResult.model';
import {
  AccessPayload,
  EmailPayload,
  RefreshToken,
} from '../domain/models/token.model';
import { User } from '../domain/models/user.domain';
import { UserSummary } from '../domain/models/userSummary.model';
import { IdentityService } from '../domain/ports/identity.service';
import { CustomJwtService } from '../domain/ports/jwt.service';
import { UserRepository } from '../domain/ports/user.repository';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class IdentityServiceAdapter extends IdentityService {
  constructor(
    private readonly jwt: CustomJwtService,
    private readonly repository: UserRepository,
  ) {
    super();
  }
  private async generateAuthResult(
    user: User,
    domain?: string,
  ): Promise<AuthResult> {
    const [accessToken, refreshToken] = await this.jwt.generateAuthTokens(
      user,
      domain,
    );
    return { user: new UserSummary(user), accessToken, refreshToken };
  }

  public override async verifyToken(accessToken: string) {
    try {
      const { id } = (await this.jwt.verifyToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      )) as AccessPayload;
      return { isValid: true, id: id.toString() };
    } catch (error) {
      return { isValid: true, id: '' };
    }
  }

  public override async signup(email, password, name, lastname, domain) {
    const formattedEmail = email.toLowerCase();
    const isUnique = await this.repository.checkEmailUniqueness(formattedEmail);
    if (!isUnique) {
      const metadata = new Metadata();
      metadata.add("statusCode", "409");
      metadata.add("description", "Error en signup");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_DUPLICATE,
        statusCode: HttpStatus.CONFLICT,
        metadata,
      });
    }
    const user = await this.repository.create(
      {
        name,
        lastname,
        email: formattedEmail,
        confirmed: false,
        password: isEmpty(password) ? 'UNSET' : await hash(password, 10),
        credentials: undefined,
      },
      AuthProvidersEnum.LOCAL,
    );

    await this.repository.createAuthProvider(AuthProvidersEnum.LOCAL, user.id);

    //TODO: Token de confirmacion de email
    // En caso de no haber esta confirmacion, enviar las credenciales de acceso
    const confirmationToken = await this.jwt.generateToken(
      user,
      TokenTypeEnum.CONFIRMATION,
      domain,
    );
    //TODO: Falta la logica para enviar mail de confirmacion
    //Si es que se va usar la confirmacion de correo

    return { message: 'Usuario registrado', success: true };
  }

  public override async confirmEmail(confirmationToken, domain) {
    const { id, version } = (await this.jwt.verifyToken(
      confirmationToken,
      TokenTypeEnum.CONFIRMATION,
    )) as EmailPayload;

    const user = await this.repository.findOneById(id);
    if (!user || user?.credentials?.version !== version) {
      const metadata = new Metadata();
      metadata.add("statusCode", "401");
      metadata.add("description", "Error en confirmEmail");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_INVALID_CREDENTIALS,
        statusCode: HttpStatus.UNAUTHORIZED,
        metadata
      });
    }
    if (user.confirmed) {
      const metadata = new Metadata();
      metadata.add("statusCode", "401");
      metadata.add("description", "Error en confirmEmail");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_ALREADY_CONFIRMED,
        statusCode: HttpStatus.UNAUTHORIZED,
        metadata,
      });
    }

    user.confirmed = true;
    user.credentials.version++;
    user.credentials.updatedAt = new Date();

    const updatedUser = await this.repository.save(user);

    // Crear respuesta de login
    const authResult = await this.generateAuthResult(updatedUser, domain);

    return authResult;
  }

  public override async signin(email, password, domain) {
    const user = await this.repository.findOneByEmail(email);

    if (!user) {
      const metadata = new Metadata();
      metadata.add("statusCode", "401");
      metadata.add("description", "Error en signin");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_INVALID_CREDENTIALS,
        statusCode: HttpStatus.UNAUTHORIZED,
        description: 'Error en signin',
        metadata
      });
    }

    if (!(await compare(password, user.password))) {
      await this.repository.checkLastPassword(user.credentials, password);
    }

    if (!user.confirmed) {
      const confirmationToken = await this.jwt.generateToken(
        user,
        TokenTypeEnum.CONFIRMATION,
        domain,
      );
      //TODO: Enviar mail de re confirmacion
      //Si es que se va usar la confirmacion de correo
      const metadata = new Metadata();
      metadata.add("statusCode", "401");
      metadata.add("description", "Error en signin");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_UNCONFIRMED,
        statusCode: HttpStatus.UNAUTHORIZED,
        metadata
      });
    }
    // Crear respuesta de login
    const authResult = await this.generateAuthResult(user, domain);

    return authResult;
  }

  public override async refreshTokenAccess(refreshToken, domain) {
    // Validar el token
    const payload = (await this.jwt.verifyToken(
      refreshToken,
      TokenTypeEnum.REFRESH,
    )) as RefreshToken;
    // Validar que no se encuentre en blacklist
    await this.checkBlackList(payload.id, payload.tokenId);

    // Validar datos del usuario
    const email = payload.sub;
    const id = payload.id;
    const user = await this.repository.findOneByEmail(email);
    if (!user || !user?.confirmed) {
      const metadata = new Metadata();
      metadata.add("statusCode", "401");
      metadata.add("description", "Error en refreshTokenAccess");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_INVALID_CREDENTIALS,
        statusCode: HttpStatus.UNAUTHORIZED,
        metadata
      });
    }
    if (user.id !== id) {
      const metadata = new Metadata();
      metadata.add("statusCode", "401");
      metadata.add("description", "Error en refreshTokenAccess");
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_ID_MISMATCH,
        statusCode: HttpStatus.UNAUTHORIZED,
        metadata
      });
    }

    // Crear respuesta
    const authResult = await this.generateAuthResult(user, domain);

    return authResult;
  }

  public override async logout(refreshToken: string) {
    // Validar el token
    const { id, tokenId, exp } = (await this.jwt.verifyToken(
      refreshToken,
      TokenTypeEnum.REFRESH,
    )) as RefreshToken;

    // Guardar el token en blacklist
    await this.saveInBlackList(id, tokenId, exp);
    return undefined;
  }

  private async saveInBlackList(
    userId: UUID,
    tokenId: string,
    exp: number,
  ): Promise<void> {
    /*
    TODO: Implementar sistema de cache con redis para usar la blacklist
    const now = new Date().getTime();
    const ttl = (exp - now) * 1000;

    if (ttl > 0) {
      await this.commonService.throwInternalError(
        this.cacheManager.set(`blacklist:${userId}:${tokenId}`, now, ttl),
      );
    }*/
  }

  private async checkBlackList(userId: UUID, tokenId: string): Promise<void> {
    /*
    TODO: Implementar sistema de cache con redis para usar la blacklist
    const time = await this.cacheManager.get<number>(
      `blacklist:${userId}:${tokenId}`,
    );

    if (!isNaN(time)) {
      throw new UnauthorizedException(IDENTITY_ERRORS.USER_TOKEN_INVALID);
    }*/
  }
}
