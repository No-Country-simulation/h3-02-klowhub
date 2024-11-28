import { Injectable} from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/courses/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async createUserIfNotExists(userId: string): Promise<Users> {
    const existingUser = await this.usersModel.findOne({ userId });

    if (!existingUser) {
      const newUser = new this.usersModel({ userId: userId });
      return await newUser.save();
    }
    return existingUser;
  }
}