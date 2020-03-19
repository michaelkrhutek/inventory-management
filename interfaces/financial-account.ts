import { FinancialAccountType } from "./financial-account-type";
import { IBasicDbModel } from "./basic-db-model";

export interface IFinancialAccount extends IBasicDbModel {
    name: string;
    code: string;
    accountType: FinancialAccountType;
    financialUnitId: string;
}