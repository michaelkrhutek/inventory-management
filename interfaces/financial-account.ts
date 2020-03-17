import { FinancialAccountType } from "./financial-account-type";

export interface IFinancialAccount {
    id: number;
    name: string;
    code: string;
    accountType: FinancialAccountType;
}