import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { CreateUserInput } from './dtos/user_create.dto';
import { UserDetails } from './interfaces/user-details';
import * as bcrpyt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  // Helper function for hashing
  async hashPassword(password: string): Promise<string> {
    return bcrpyt.hash(password, 10);
  }
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserInput.password);
    createUserInput.password = hashedPassword;
    const createdUser = new this.userModel(createUserInput);
    await createdUser.save()
    return createdUser
  }


  async findByuserName(userName: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ userName }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async getUserDetails(id: string): Promise<UserDetails> {
    const user = await this.findById(id);
    if (!user) return null;

    return {
      id: user.id,
      username: user.userName,
      email: user.email,
    };
  }
}