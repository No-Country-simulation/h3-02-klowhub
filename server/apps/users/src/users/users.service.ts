import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { ModeDto } from './dto/mode.Shcema';
import { ConfigEnvs } from 'src/config/envs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  [x: string]: any;
  linkProvider() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserById(req: Request): Promise<any> {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing');
    }

    // Decodificar el token para obtener el payload
    const payload = this.jwtService.verify(token, {
      secret: ConfigEnvs.JWT_SECRET
    } ); // Cambiar decode por verify para mayor seguridad
    Logger.log(payload)
    if (!payload || !payload.userId) {
      throw new Error('Invalid token payload');
    }

    const userId = payload.userId;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'title',
        'biography',
        'image',
        'reviws',
        'whyLearn',
        'rating',
        'role',
        'createdAt',
      ],
      relations: ['accounts'],
    });

    if (!user) {
      return null;
    }
    Logger.log(JSON.stringify(user, null, 2));
    Logger.log(user)
    return JSON.stringify(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<UserEntity | null> {
    const account = await this.accountRepository.findOne({
      where: { provider, providerAccountId },
      relations: ['user'],
    });
    return account ? account.user : null;
  }

  async createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async linkAccountToUser(
    userId: string,
    accountData: Partial<AccountEntity>,
  ): Promise<AccountEntity> {
    const account = this.accountRepository.create({
      ...accountData,
      userId,
    });
    return this.accountRepository.save(account);
  }

  async updateUser(
    userId: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity> {
    await this.userRepository.update(userId, data);
    return this.userRepository.findOneOrFail({ where: { id: userId } });
  }
  //actualizar Modo de usuario a creador
  async updateMode(useId: string, modeDto:ModeDto) {

  }
  async findUserByIdUnAuthorized(id: string): Promise<any> {
    try {
     const user = await this.userRepository.findOne({
      where: {id},
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'title',
        'biography',
        'image',
        'reviws',
        'whyLearn',
        'rating',
        'role',
        'createdAt',
      ],
      relations: ['accounts'],
    });
    return JSON.stringify(user)
  } catch (error) {
    return error
  }
  } 
  // 
  // async changeUserRole(userId: string, mode) {
  //   // Buscar al usuario por ID
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new Error('Usuario no encontrado');
  //   }

  //   // Actualizar el rol
  //   if (mode === 'user') {
  //     user.role = UserRole.USER;
  //   } else if (mode === 'creator') {
  //     user.role = UserRole.CREATOR;
  //   } else {
  //     throw new Error('Modo no válido');
  //   }

  //   // Guardar los cambios en la base de datos
  //   return this.userRepository.save(user);
  // }

  // buscar User por ID
  
}