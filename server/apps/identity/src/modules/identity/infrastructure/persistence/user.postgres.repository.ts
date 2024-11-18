import { User } from '@/modules/identity/domain/models/user.domain';
import { UserRepository } from '@/modules/identity/domain/ports/user.repository';
import { AuthProvidersEnum } from '@/modules/identity/domain/enums/authProvider.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { UserSchema } from './user.schema';
import { Credentials } from '../../domain/models/credentials.domain';
import { IDENTITY_ERRORS } from '../../domain/constants/messages';
import { AuthProviderSchema } from './authproviders.schema';
import { AuthProvider } from '../../domain/models/authProvider.domain';
import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonService } from '@common/interfaces/common.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserPostgresRepository extends UserRepository {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(UserSchema)
    private readonly repository: Repository<User>,
    @InjectRepository(AuthProviderSchema)
    private readonly authProvidersRepository: Repository<AuthProvider>,
  ) {
    super();
  }

  public override async create(
    user: User,
    provider: AuthProvidersEnum,
  ): Promise<User> {
    const { name } = user;
    const isConfirmed = provider !== AuthProvidersEnum.LOCAL;

    const formattedName = this.commonService.formatTitle(name);
    const userCreated = this.repository.create({
      ...user,
      name: formattedName,
      confirmed: isConfirmed,
      credentials: new Credentials(isConfirmed),
    });
    return await this.commonService.saveEntity(
      this.repository,
      userCreated,
      IDENTITY_ERRORS.USER_DUPLICATE,
    );
  }

  public override async save(user: User): Promise<User> {
    const updated = await this.commonService.saveEntity(
      this.repository,
      user,
      IDENTITY_ERRORS.USER_UNEXPECTED,
    );
    return updated;
  }

  findOrCreate(user: User, provider: AuthProvidersEnum): Promise<User> {
    throw new Error('Method not implemented.');
  }
  public override async findOneById(userId: UUID): Promise<User> {
    const user = await this.repository.findOne({
      where: {  },
    });
    return user;
  }
  public override async findOneByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email: email.toLowerCase() },
    });
    return user;
  }
  public override async checkEmailUniqueness(email: string): Promise<boolean> {
    return !(await this.repository.exist({ where: { email } }));
  }
  updateName(userId: number, name: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateEmail(userId: number, email: Email): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async createAuthProvider(
    provider: AuthProvidersEnum,
    userId: UUID,
  ): Promise<AuthProvider> {
    const providerCreated = this.authProvidersRepository.create({
      user: { id: userId },
      provider,
    });

    return await this.commonService.saveEntity(
      this.authProvidersRepository,
      providerCreated,
      IDENTITY_ERRORS.AUTH_PROVIDER_ERROR,
    );
  }

  public async checkLastPassword(
    credentials: Credentials,
    password: string,
  ): Promise<void> {
    const { lastPassword, passwordUpdatedAt } = credentials;

    if (lastPassword.length === 0 || !(await compare(password, lastPassword))) {
      throw new RpcException({
        message: IDENTITY_ERRORS.USER_INVALID_CREDENTIALS,
        statusCode: 401,   
        service: 'IdentityService',  
        details: "Error en checkLastPassword",
      });
    }
    const now = new Date();

    // Diferencia en ms
    const diffInMs = now.getTime() - passwordUpdatedAt.getTime();
    const timeUnits = [
      { unit: 'mes', value: Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30)) },
      { unit: 'dia', value: Math.floor(diffInMs / (1000 * 60 * 60 * 24)) },
      { unit: 'hora', value: Math.floor(diffInMs / (1000 * 60 * 60)) },
    ];
    // Si la contraseña es antigua se lanza una excepcion informando desde hace cuanto cambio la contraseña
    for (const { unit, value } of timeUnits) {
      if (value > 0) {
        const plural = value > 1 ? (unit === 'mes' ? 'es' : 's') : '';
        throw new RpcException({
          message: `${IDENTITY_ERRORS.USER_PASSWORD_CHANGED}. Desde hace ${value} ${unit}${plural}`,
          statusCode: 401,   
          service: 'IdentityService',  
          details: "Error en checkLastPassword",
        });
      }
    }

    throw new RpcException({
      message: `${IDENTITY_ERRORS.USER_PASSWORD_CHANGED} recientemente.`,
      statusCode: 401,   
      service: 'IdentityService',  
    });
  }
}
