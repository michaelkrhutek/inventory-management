import { IFinancialUnit, FinancialUnitModel } from "../models/financial-unit-model";

export const isFinancialUnitNameUnique = async (name: string): Promise<boolean> => {
    return !(await FinancialUnitModel.exists({ name }).catch(() => true));

};

export const createFinancialUnit = async (name: string): Promise<IFinancialUnit> => {
    const isNameUnique: boolean = await isFinancialUnitNameUnique(name);
    if (!isNameUnique) {
        throw('Name already exists');
    }
    const financialUnit = new FinancialUnitModel({ name, isActive: true });
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
    await FinancialUnitModel.findByIdAndUpdate(id, { isActive: false }).catch(() => {
        throw('Error while deleting a financial unit in a database');
    });
    return 'OK';
}