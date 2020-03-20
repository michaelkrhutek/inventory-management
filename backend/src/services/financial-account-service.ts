import { IFinancialAccount, FinancialAccountModel } from "../models/financial-account-model";
import { FinancialAccountType } from "../../../interfaces/financial-account-type";

export const isFinancialAccountNameUnique = async (name: string, financialUnitId: string): Promise<boolean> => {
    return !(await FinancialAccountModel.exists({ name, financialUnitId }).catch(() => true));
};

export const isFinancialAccountCodeUnique = async (code: string, financialUnitId: string): Promise<boolean> => {
    return !(await FinancialAccountModel.exists({ code, financialUnitId }).catch(() => true));
};

export const isAccountTypeStringValid = (accountTypeString: string): boolean => {
    const accountTypes: FinancialAccountType[] = [
        FinancialAccountType.Assets,
        FinancialAccountType.Equity,
        FinancialAccountType.Expenses,
        FinancialAccountType.Liabilities,
        FinancialAccountType.Revenues
    ];
    return accountTypes.some((type: FinancialAccountType) => type.toString() == accountTypeString);
}

export const createFinancialAccount = async (
    name: string,
    code: string,
    accountType: string,
    financialUnitId: string
): Promise<IFinancialAccount> => {
    if (!isAccountTypeStringValid(accountType)) {
        throw('Invalid account type');
    }
    if (!await isFinancialAccountNameUnique(name, financialUnitId)) {
        throw('Name already exists');
    }
    if (!await isFinancialAccountCodeUnique(code, financialUnitId)) {
        throw('Code already exists');
    }
    const FinancialAccount = new FinancialAccountModel({ name, code, financialUnitId, accountType });
    return await FinancialAccount.save().catch((err) => {
        console.log(err);
        throw('Error while saving a financial unit to a database');
    });
}

export const getFinancialAccount = async (id: string): Promise<IFinancialAccount> => {
    return await FinancialAccountModel.findById(id).catch(() => {
        throw('Error while listing a financial account from a database');
    });
}

export const getAllFinancialAccounts = async (financialUnitId: string): Promise<IFinancialAccount[]> => {
    return await FinancialAccountModel.find({ financialUnitId }).catch((err) => {
        console.log(err);
        throw('Error while listing all financial accounts from a database');
    });
}