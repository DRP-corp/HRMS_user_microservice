import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/user_create.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) { }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => String)
  @UseGuards(JwtGuard)
  helloWorld() {
    // console.log(context)
    return "hello there";
  }
  // @Query((returns) => User)
  // getUser(@Args({ name: 'id', type: () => ID }) id: number): User {
  //   return this.usersService.findById(id);
  // }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }): User {
  //   return this.usersService.findById(reference.id);
  // }
}
