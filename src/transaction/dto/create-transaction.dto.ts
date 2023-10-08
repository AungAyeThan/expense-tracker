import { IsInt, IsArray,  IsNotEmpty, MaxLength, ValidateNested, IsIn, Contains, IsOptional, Length, IsDateString } from 'class-validator'
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto'

export class CreateTrasactionDto {
    @IsNotEmpty()
    @MaxLength(50)
    category: string

    @IsInt()
    amount: number
    
    @IsDateString()
    date: Date 

    @IsIn(['income', 'expense'], { message: 'type must be either income or expense'})
    type: string

    @IsOptional()
    @MaxLength(100)
    notes: string

    @IsIn(['cash', 'qrcode', 'debitcard', 'banktransfer'], { message: 'type must be either cash, qrcode, debitcard, banktransfer'})
    payment_method: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[]
}