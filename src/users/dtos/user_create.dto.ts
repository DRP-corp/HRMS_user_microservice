import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    @IsOptional()
    name: string

    @Field(() => String)
    userName: string

    @Field(() => String)
    @IsNotEmpty()
    email: string

    @Field(() => String)
    @IsNotEmpty()
    password: string

    @IsOptional()
    @Field()
    // TODO remove nullable 
    // @Field({ nullable: true })
    age?: number

    
}