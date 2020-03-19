import { InventoryTransactionType } from "./inventory-transaction-type";
import { IBasicDbModel } from "./basic-db-model";

export interface IInventoryTransactionTemplate extends IBasicDbModel {
    transactionType: InventoryTransactionType;
    debitAccountId: number;
    creditAccountId: number;
}