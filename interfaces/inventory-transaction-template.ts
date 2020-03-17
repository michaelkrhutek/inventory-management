import { InventoryTransactionType } from "./inventory-transaction-type";

export interface IInventoryTransactionTemplate {
    id: number;
    transactionType: InventoryTransactionType;
    debitAccountId: number;
    creditAccountId: number;
}