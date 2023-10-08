import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/provider/respository/user.repository';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/constant/jwt.constant";
import { UserController } from './user.controller';
import { UserStrategy } from './user.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserStrategy],
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '50m' },
  })],
})
export class UserModule {}
