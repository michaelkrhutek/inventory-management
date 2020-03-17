import { IFinancialAccountEntry } from "./financial-account-entry";

export interface IFinancialTransaction {
    id: number;
    inventoryTransactionId: number;
    accountEntries: IFinancialAccountEntry[]; 
}