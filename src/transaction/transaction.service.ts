import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrasactionDto } from './dto/create-transaction.dto';
import { Transaction } from 'src/provider/respository/transaction.interface';
import { $Enums, Prisma } from '@prisma/client';
import { TransactionRepository } from 'src/provider/respository/transaction.repository';
import { Filter, TransactionFilter } from './type/filter';

@Injectable()
export class TransactionService {
    constructor(private transactionRepo: TransactionRepository){}

    async saveTransaction(transaction: CreateTrasactionDto, userId: string): Promise<Transaction>{
        const { items, amount, category, date, notes, type, payment_method } = transaction;
        
        const totalItemCost = transaction.items.reduce((acc, item) => acc + item.price*item.quantity, 0);

        if(totalItemCost !== amount){
            throw new BadRequestException('Total price is not equal to the sum of items price');
        }

        const expenseRecord: Transaction = {
            category,
            amount,
            items,
            date,
            user_id: userId,
            notes,
            type: $Enums.TransactionType[type], 
            payment_method: $Enums.PaymentMethod[payment_method],
        }

        return this.transactionRepo.createTransaction(expenseRecord);
    }

    async getTransaction(transactionId: string): Promise<Transaction>{
        const data = await this.transactionRepo.getTransaction(transactionId);
        if (!data) {
            throw new BadRequestException('Transaction not found');
        }

        return data;
    }

    async listTransactions(filter?: Filter, orderBy?: string){
        // TODO: refactor this to be more efficient and dynamic
        const filterVal: TransactionFilter = {
            category: filter.category,
            type: $Enums.TransactionType[filter.type],
        }

        const orderByVal = orderBy as Prisma.SortOrder
        return this.transactionRepo.listTransactions(filterVal, orderByVal);
    }

    async deleteTransaction(transactionId: string): Promise<Transaction>{
        try {
            const data = await this.transactionRepo.deleteTransactions(transactionId);
            return data;
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException("transaction not found: unable to delete transaction");
            }
            throw err;
        }
    }
}
