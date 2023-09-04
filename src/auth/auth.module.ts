import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User, UserSchema } from '../users/models/user.model';
import { JwtStrategy } from './guards/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService, AuthService, AuthResolver, JwtStrategy, PassportModule,],
  imports: [
    JwtModule.registerAsync({
      useFactory:
        () => ({
          secret: 'quicksilver',
          signOptions: {
            expiresIn: '36000s'
          }
        })
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema, }]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault(),],
    }),]
})
export class AuthModule { }
