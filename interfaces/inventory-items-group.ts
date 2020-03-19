import { IInventoryTransactionTemplate } from "./inventory-transaction-template";
import { IBasicDbModel } from "./basic-db-model";

export interface IInventoryItemsGroup extends IBasicDbModel {
    name: string;
    transactionTemplates: IInventoryTransactionTemplate[];
}