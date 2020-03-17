import { IQuantityIncrementTransactionData, IQuantityDecrementTransactionData, IRevaluationTransactionData } from "./inventory-transaction-data";
import { InventoryTransactionType } from "./inventory-transaction-type";

type InventoryTransactionData = IQuantityIncrementTransactionData | IQuantityDecrementTransactionData | IRevaluationTransactionData;

export interface IInventoryTransaction {
    id: number;
    description: string;
    transactionType: InventoryTransactionType;
    data: InventoryTransactionData;
    transactionTemplateId: number;
}