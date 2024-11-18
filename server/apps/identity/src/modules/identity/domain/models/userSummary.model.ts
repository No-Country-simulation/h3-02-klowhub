import { UUID } from 'crypto';
import { User } from './user.domain';

export class UserSummary {
  public readonly id: UUID;
  public readonly name: string;
  public readonly lastname: string;
  public readonly email: string;
  public readonly confirmed: boolean;

  constructor(user: User) {
    this.id = user.id!;
    this.name = user.name;
    this.lastname = user.lastname;
    this.email = user.email;
    this.confirmed = user.confirmed;
  }
}
