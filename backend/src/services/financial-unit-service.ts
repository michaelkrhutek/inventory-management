import { IFinancialUnit, FinancialUnitModel } from "../models/financial-unit-model";
import * as logService from './log-service';

export const isFinancialUnitNameUnique = async (name: string): Promise<boolean> => {
    return !(await FinancialUnitModel.exists({ name }).catch(() => true));
};

export const createFinancialUnit = async (name: string): Promise<IFinancialUnit> => {
    const isNameUnique: boolean = await isFinancialUnitNameUnique(name);
    if (!isNameUnique) {
        logService.logError('Name already exists');
        throw('Name already exists');
    }
    const financialUnit = new FinancialUnitModel({ name, isDeleted: false });
    return await financialUnit.save().catch(() => {
        throw('Error while saving a financial unit to a database');
    });
}

export const getFinancialUnit = async (id: string): Promise<IFinancialUnit> => {
    return await FinancialUnitModel.findById(id).catch(() => {
        throw('Error while listing a financial unit from a database');
    });
}

export const getAllFinancialUnits = async (): Promise<IFinancialUnit[]> => {
    return await FinancialUnitModel.find({}).catch(() => {
        throw('Error while listing all financial units from a database');
    });
}

export const deleteFinancialUnitSoft = async (id: string): Promise<'OK'> => {
    await FinancialUnitModel.findByIdAndUpdate(id, { isDeleted: true }).catch(() => {
        throw('Error while deleting a financial unit in a database');
    });
    return 'OK';
}

// export const deleteFinancialUnitHard = async (id: string): Promise<'OK'> => {
//     await FinancialUnitModel.findByIdAndDelete(id).catch(() => {
//         throw('Error while deleting a financial unit in a database');
//     });
//     return 'OK';
// }