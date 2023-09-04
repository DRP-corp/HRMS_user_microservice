import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User, UserSchema } from './models/user.model';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema, }]),
  ],
  exports: [UsersService]
})
export class UsersModule { }
