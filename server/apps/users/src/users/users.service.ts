import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { ModeDto } from './dto/mode.Shcema';
import { UserRole } from 'src/entities/UserRole';
import { RpcException } from '@nestjs/microservices';

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
  ) {}

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
  async findUserById(userId: string): Promise<Partial<UserEntity> | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'image',
        'role',
        'createdAt',
        'isEmailVerified',
      ], // Solo seleccionamos los campos que queremos retornar
      relations: ['accounts'], // Si necesitas incluir relaciones
    });

    if (!user) {
      return null; // Retornar null si el usuario no existe
    }

    return user;
  }
}