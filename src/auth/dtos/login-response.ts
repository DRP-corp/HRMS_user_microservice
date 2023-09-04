import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

export class userDetails{
    @Field()
    username: string;

}

@ObjectType()
export class LoginResponse {
    @Field()
    access_token: string;

}