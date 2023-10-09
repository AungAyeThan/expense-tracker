import { Injectable } from "@nestjs/common";
import { PrismaClient, Prisma } from '@prisma/client';
import { Transaction } from "./transaction.interface";

import { TransactionFilter } from "src/transaction/type/filter";
const prisma = new PrismaClient();


@Injectable()
export class TransactionRepository {
    constructor(){}

    async createTransaction(transactionData: Transaction): Promise<any>{
        const transaction = await prisma.transactions.create({
            data: transactionData,
        })
        return transaction;
    }

    async getTransaction(transactionId: string): Promise<Transaction>{
        const transaction = await prisma.transactions.findFirst({
            where: {
                id: transactionId
            }
        })

        return transaction;
    }

    async listTransactions(filter: TransactionFilter, orderBy: Prisma.SortOrder): Promise<Transaction[]>{
        // TODO: Create a dynamic where object based on provided filters
        const where: Prisma.TransactionsWhereInput = {};

        if (filter.category) {
            where.category = filter.category;
        }
        
        if (filter.type) {
            where.type = filter.type;
        }

        const transaction = await prisma.transactions.findMany({ where, orderBy:[
            {
                date: orderBy
            }
        ] });
        return transaction;
    }

    async deleteTransactions(transactionId: string): Promise<Transaction>{
        const transaction = await prisma.transactions.delete({
            where: {
                id: transactionId
            }
        })

        return transaction;
    }
}


