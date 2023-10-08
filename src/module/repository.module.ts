import { UserRepository } from 'src/provider/respository/user.repository';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionRepository } from 'src/provider/respository/transaction.repository';

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [
        UserRepository,
        TransactionRepository,
    ],
    exports: [
        UserRepository,
        TransactionRepository,
    ],
})

export class RepositoryModule {}
  