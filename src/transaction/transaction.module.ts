import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { RepositoryModule } from 'src/module/repository.module';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from 'src/provider/respository/transaction.repository';

@Module({
  controllers: [ TransactionController ],
  providers: [ TransactionService ],
  imports: [ RepositoryModule ],
})
export class TransactionModule {}
