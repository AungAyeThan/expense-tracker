import { BadRequestException, Body, Controller, Delete, Get, Param, ParseEnumPipe, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from "express";
import { TransactionService } from './transaction.service';
import { CreateTrasactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/provider/respository/user.interface';
import { UserTransformerPipe } from 'src/validator/user-transformer.pipe';
import { FilterParserPipe } from './pipes/filter-parser.pipe';
import { Filter } from './type/filter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService){}
    
    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async createTransaction(@Param('userId', UserTransformerPipe) user:User, @Body() createTransaction: CreateTrasactionDto, @Res() res: Response) {
        try {
            const transaction = await this.transactionService.saveTransaction(createTransaction, user.id);
            return res.json({message : "success"});
        } catch (err) {
            throw err;
        }
    }

    @Get('/expenses/:transactionId')
    @UseGuards(AuthGuard('jwt'))
    async getTransaction(@Param('transactionId') transactionId: string, @Res() res: Response){
        try {
            const transaction = await this.transactionService.getTransaction(transactionId);
            return res.json(transaction);
        } catch (err) {
            throw err;
        }
    }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    async listTransactions(
        @Res() res: Response,
        @Query('filter', FilterParserPipe) filter?: Filter,
        @Query('orderBy', new ParseEnumPipe(['asc', 'desc'], {optional: true, exceptionFactory: ()=> "invalid order type"})) orderBy?: string,
    ){
        try {
            const transaction = await this.transactionService.listTransactions(filter, orderBy);
            return res.json({"data": transaction});
        } catch (err) {
            throw err;
        }
    }

    @Delete('/expenses/:transactionId')
    async deleteTransaction(@Param('transactionId') transactionId: string, @Res() res: Response){
        const transaction = await this.transactionService.deleteTransaction(transactionId);
        return res.json({message : "success"});
    }
}
