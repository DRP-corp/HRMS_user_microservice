import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HiDetails {
    @Field()
    hi: String;
}