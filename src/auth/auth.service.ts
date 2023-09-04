import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrpyt from 'bcrypt';
// import { ExistingUserDto } from 'src/user/dtos/existing_user.dto';
// import { ChangePasswordDTO } from 'src/users/dtos/change_password.dto';
import { CreateUserInput } from 'src/users/dtos/user_create.dto';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDetails } from 'src/users/interfaces/user-details';
import { ExistingUserDto } from './dtos/existing-user.dto';
import { LoginUserInput } from './dtos/login-user.input';
import { User } from 'src/users/models/user.model';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    // Helper function for hashing
    async hashPassword(password: string): Promise<string> {
        return bcrpyt.hash(password, 10);
    }

    // async register(user: Readonly<NewUserDto>): Promise<null> {
    //     const { username, email, password } = user;
    //     const existingUser = await this.userService.findByEmail(email);
    //     if (existingUser) {
    //         throw new BadRequestException("Email already exists"); return;
    //     };

    //     const ex_user = await this.userService.findByusername(username);
    //     if (ex_user) {
    //         throw new BadRequestException('Username already in use!!'); return;
    //     }

    //     const hashedPassword = await this.hashPassword(password);
    //     await this.userService.create(username, email, hashedPassword);
    //     return;
    // }

    // Helper for password check
    async passwordCheck(password: string, hashedPassword):
        Promise<boolean> {
        return bcrpyt.compare(password, hashedPassword);
    }

    // Helper to validate user
    async validateUser(username: string, password: string):
        Promise<UserDetails | null> {
        const user = await this.userService.findByuserName(username);
        const doesUserExist = !!user;
        if (!doesUserExist)  { throw new BadRequestException('No User exists!!'); };

        const passwordCheck = await this.passwordCheck(password, user.password);
        if (!passwordCheck) { throw new BadRequestException('The password entered does not match!!'); };

        return this.userService.getUserDetails(user.id);

    }

    async login(
        existingUser: LoginUserInput,
    ): Promise<{ Token: string, user: UserDetails} | null> {
        const { username, password } = existingUser;
        const user = await this.validateUser(username, password);

        if (!user) return null;
        const jwt = await this.jwtService.signAsync({ user });
        console.log(jwt)
        return { Token: jwt, user: user };

    }

    // async changePassword(
    //     id: string,
    //     changePassword: ChangePasswordDTO
    // ): Promise<null> {
    //     const { old_password, new_password } = changePassword;

    //     const user = await this.userService.findById(id);
    //     const currenctpasswordCheck = await this.passwordCheck(old_password, user.password);

    //     if (!currenctpasswordCheck) { throw new BadRequestException('The password entered does not match the old password!!'); };
    //     user.password = await this.hashPassword(new_password);
    //     user.save()
    //     return;
    // }

}
