import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from "express";

import { CreateUserDto, LoginDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const user = await this.userService.signup(createUserDto);
            return res.json(user);
        } catch (err) {
            throw err;
        }
    }
    
    @Post('login')
    async signin(@Body() loginDto: LoginDto, @Res() res: Response){
        try {
            const token = await this.userService.login(loginDto);
            return res.status(200).json(token)
        } catch (err) {
            throw err;
        }
    }
}