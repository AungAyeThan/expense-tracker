import { $Enums } from "@prisma/client";
import { User } from "./user.interface";

export interface Transaction {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;

    category: string;
    amount: number;
    type: $Enums.TransactionType;
    date: Date | string;
    notes: string;
    payment_method: $Enums.PaymentMethod;
    items: Items[];
    user_id: string;
}

interface Items {
    name: string,
    price: number,
    quantity: number,
}
