import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    username: string

    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @MinLength(6)
    password: string
}

export class LoginDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}