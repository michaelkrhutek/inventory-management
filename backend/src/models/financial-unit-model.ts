import { Document } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IFinancialUnit extends Document {
    name: string;
    isDeleted: boolean;
};

export const FinancialUnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true }
});

export const FinancialUnitModel = mongoose.model<IFinancialUnit>('FinancialUnit', FinancialUnitSchema);