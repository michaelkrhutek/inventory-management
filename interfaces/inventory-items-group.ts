import { IInventoryTransactionTemplate } from "./inventory-transaction-template";

export interface IInventoryItemsGroup {
    id: number;
    name: string;
    transactionTemplates: IInventoryTransactionTemplate[];
}