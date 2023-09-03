import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { CreateUserInput } from './dtos/user_create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

   createUser(createUserInput: CreateUserInput): User{
    const createdUser = new this.userModel(createUserInput);
    
    createdUser.save()
    return createdUser
  }
}