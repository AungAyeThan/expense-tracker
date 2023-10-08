
import { BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from 'src/provider/respository/user.interface';
import { UserRepository } from 'src/provider/respository/user.repository';

@Injectable()
export class UserTransformerPipe implements PipeTransform {
    constructor(private readonly userRepository: UserRepository) {}
    
    async transform(userId: string): Promise<User> {
        const user = await this.userRepository.getUser(userId);
        if(!user){
            throw new NotFoundException('User not found');
        }

        return user;
    }
}