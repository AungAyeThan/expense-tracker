import { Injectable } from "@nestjs/common";
import { DatabaseService } from 'src/database/database.service';
import { PrismaClient, Prisma } from '@prisma/client';
import { User } from './user.interface'

const prisma = new PrismaClient();


@Injectable()
export class UserRepository {
    constructor(){}

    async checkUserByEmail(email: string): Promise<User>{
        const userExist = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        return userExist;
    }

    async createUser(userData: User): Promise<User>{
        const user = await prisma.users.create({
            data: userData,
        })
        return user;
    }

    async getUser(userId: string): Promise<User>{
        const user = await prisma.users.findFirst({
            where: {
                id: userId
            }
        })

        return user;
    }
}


