import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooSchmea} from 'mongoose'
import { Role } from '../enums/roles';
@ObjectType()
@Schema()
export class User {
  // TODO model fields modeling
  @Field(()=> String)
  _id: MongooSchmea.Types.ObjectId;

  @Field(() => String)
  @Prop()
  userName: string;

  // TODO remove nullable 
  // @Field({nullable: true})
  // @Prop({required: false})
  @Field()
  @Prop()
  age?: number;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);