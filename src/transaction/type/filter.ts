import { $Enums } from "@prisma/client";

export interface Filter {
    [key: string]: string;
}

export type TransactionFilter = {
    category?: string;
    type?: $Enums.TransactionType;
  };