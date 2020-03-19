import { IFinancialAccountEntry } from "./financial-account-entry";

export interface IFinancialTransaction {
    inventoryTransactionId: string;
    accountEntries: IFinancialAccountEntry[]; 
}