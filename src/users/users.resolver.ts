import { Args, ID, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/user_create.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(()=> User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput){
    return this.usersService.createUser(createUserInput);
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
