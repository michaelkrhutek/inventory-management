import { FinancialAccountEntryType } from "./financial-account-entry-type";

export interface IFinancialAccountEntry {
    accountId: number;
    entryType: FinancialAccountEntryType;
    amount: number;
}