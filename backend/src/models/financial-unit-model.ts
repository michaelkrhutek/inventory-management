import { Mongoose, Document } from 'mongoose';
import { connectionUrl } from '../../connection-url';

const mongoose = new Mongoose();

mongoose.connect(connectionUrl, { useUnifiedTopology: true });

mongoose.connect(connectionUrl, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
});

export interface IFinancialUnit extends Document {
    name: string;
    isActive: boolean;
};

export const FinancialUnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, required: true }
});

export const FinancialUnitModel = mongoose.model<IFinancialUnit>('FinancialUnit', FinancialUnitSchema);