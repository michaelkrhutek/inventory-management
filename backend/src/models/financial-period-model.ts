import { Document, Schema } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IFinancialPeriod extends Document {
    startDate: Date;
    endDate: Date;
    financialUnitId: string;
};

export const FinancialPeriodSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    financialUnitId: { type: Schema.Types.ObjectId, ref: 'FinancialUnit', required: true }
});

export const FinancialPeriodModel = mongoose.model<IFinancialPeriod>('FinancialPeriod', FinancialPeriodSchema);