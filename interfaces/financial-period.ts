import { IBasicDbModel } from "./basic-db-model";

export interface IFinancialPeriod extends IBasicDbModel {
    startDate: Date;
    endDate: Date;
    financialUnitId: string;
}