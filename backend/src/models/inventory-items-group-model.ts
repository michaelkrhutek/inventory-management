import { Document, Schema } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IInventoryItemsGroup extends Document {
    name: string;
    financialUnitId: string;
};

export const InventoryItemsGroupSchema = new mongoose.Schema({
    name: String,
    financialUnitId: { type: Schema.Types.ObjectId, ref: 'FinancialUnit', required: true }
});

export const InventoryItemsGroupModel = mongoose.model<IInventoryItemsGroup>('InventoryItemsGroup', InventoryItemsGroupSchema);