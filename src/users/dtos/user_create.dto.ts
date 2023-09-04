import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string

    @Field(() => String)
    userName: string

    @Field(() => String)
    @IsNotEmpty()
    email: string

    @Field(() => String)
    @IsNotEmpty()
    password: string

    @Field()
    age: number
}