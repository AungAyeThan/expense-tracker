import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/provider/respository/user.repository';
import { CreateUserDto, LoginDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/provider/respository/user.interface';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}
    
    // User Signup to create a new user.
    async signup(req: CreateUserDto): Promise<User> {
        // const userExist = await this.userRepository.checkUserByEmail(req.email);
        // if(userExist){
        //     throw new HttpException('User already exist', 400);
        // }

        const hash = await bcrypt.hash(req.password, 10);
        const userData: User = {
            username: req.username,
            email: req.email,
            password: hash,
        }

        const user = await this.userRepository.createUser(userData);
        return user;
    }

    async login(req: LoginDto): Promise<{ token: string | null }>{
        const error = {error: 'Invalid email or password'}

        const _user = await this.userRepository.checkUserByEmail(req.email);
        if(!_user){
            throw new ForbiddenException();
        }

        // validate password
        const comparePwd = await bcrypt.compare(req.password, _user?.password);
        if (!comparePwd) {
            throw new UnauthorizedException(error);
        }

        //get jwt token
        const payload = { sub: _user.id, username: _user.username };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

}