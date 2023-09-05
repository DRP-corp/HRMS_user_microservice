// import { ObjectType, Field } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument, Schema as MongooSchmea} from 'mongoose'

// @ObjectType()
// @Schema()
// export class UserDetails {
//   // TODO model fields modeling
//   @Field(()=> String)
//   _id: MongooSchmea.Types.ObjectId;

//   @Field(() => String)
//   @Prop()
//   userName: string;

//   @Field()
//   @Prop()
//   age: number;

//   @Field(() => String)
//   @Prop()
//   password: string;

//   @Field(() => String)
//   @Prop({ unique: true })
//   email: string;
// }

// export type UserDocument = HydratedDocument<User>;
// export const UserSchema = SchemaFactory.createForClass(User);