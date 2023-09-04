import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response';
import { LoginUserInput } from './dtos/login-user.input';
import { JwtGuard } from './guards/jwt.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        const details = await this.authService.login(loginUserInput)
        // TODO Response structure needs work
        return { access_token: details.Token };
    }

}