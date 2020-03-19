import { Document, Schema } from 'mongoose';
import { FinancialAccountType } from '../../../interfaces/financial-account-type'
import { mongoose } from './mongoose-instance';

export interface IFinancialAccount extends Document {
    name: string;
    code: string;
    accountType: FinancialAccountType;
    financialUnitId: string;
};

export const FinancialAccountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    accountType: { type: String, required: true },
    financialUnitId: { type: Schema.Types.ObjectId, ref: 'FinancialUnit', required: true },
});

export const FinancialAccountModel = mongoose.model<IFinancialAccount>('FinancialAccount', FinancialAccountSchema);