import { IFinancialPeriod, FinancialPeriodModel } from "../models/financial-period-model";
import { FinancialUnitModel } from "../models/financial-unit-model";
import * as logService from './log-service';

export const getLastFinancialPeriod = async (financialUnitId: string): Promise<IFinancialPeriod | null> => {
    return await FinancialUnitModel.findOne({ financialUnitId }).sort({ endDate: 1 }).catch(() => {
        throw('Error while list a last financial period');
    });
};

const getIsFirstDateAfterSecondDate = (firstDate: Date, secondDate: Date): boolean => {
    if (firstDate.getFullYear < secondDate.getFullYear) {
        return false;
    }
    if (firstDate.getMonth < secondDate.getMonth) {
        return false;
    }
    if (firstDate.getDate <= secondDate.getDate) {
        return false;
    }
    return true;
}

export const createFinancialPeriod = async (
    startDate: Date,
    endDate: Date,
    financialUnitId: string
): Promise<IFinancialPeriod> => {
    const lastFinancialPeriod: IFinancialPeriod | null = await getLastFinancialPeriod(financialUnitId);
    if (lastFinancialPeriod) {
        const isStartDateValid: boolean = getIsFirstDateAfterSecondDate(startDate, lastFinancialPeriod.endDate);
        if (!isStartDateValid) {
            throw('Invalid start date');
        }     
    }
    const FinancialPeriod = new FinancialPeriodModel({ startDate, endDate, financialUnitId });
    return await FinancialPeriod.save().catch((err) => {
        logService.logError(err);
        throw('Error while saving a financial unit to a database');
    });
}

export const getFinancialPeriod = async (id: string): Promise<IFinancialPeriod> => {
    return await FinancialPeriodModel.findById(id).catch((err) => {
        logService.logError(err);
        throw('Error while listing a financial period from a database');
    });
}

export const getAllFinancialPeriods = async (financialUnitId: string): Promise<IFinancialPeriod[]> => {
    return await FinancialPeriodModel.find({ financialUnitId }).catch((err) => {
        logService.logError(err);
        throw('Error while listing all financial periods from a database');
    });
}