import { IQuantityIncrementTransactionData, IQuantityDecrementTransactionData, IRevaluationTransactionData } from "./inventory-transaction-data";
import { InventoryTransactionType } from "./inventory-transaction-type";
import { IBasicDbModel } from "./basic-db-model";

type InventoryTransactionData = IQuantityIncrementTransactionData | IQuantityDecrementTransactionData | IRevaluationTransactionData;

export interface IInventoryTransaction extends IBasicDbModel {
    description: string;
    transactionType: InventoryTransactionType;
    data: InventoryTransactionData;
    transactionTemplateId: string;
}