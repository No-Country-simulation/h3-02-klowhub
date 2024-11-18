import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';

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
}
