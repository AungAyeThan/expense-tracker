import { Length, IsInt, Min } from "class-validator";

export class ItemDto {
    @Length(3, 50)
    name: string;
    
    @IsInt()
    price: number;

    @Min(1)
    quantity: number;
}