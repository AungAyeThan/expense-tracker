import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ UserModule, TransactionModule ],
})
export class AppModule {}
