import { Document, Schema } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IInventoryItem extends Document {
    name: String;
    financialUnitId: string;
    inventoryItemsGroupId: string;
};

export const InventoryItemSchema = new mongoose.Schema({
    name: String,
    financialUnitId: { type: Schema.Types.ObjectId, ref: 'FinancialUnit', required: true },
    inventoryItemsGroupId: { type: Schema.Types.ObjectId, ref: 'InventoryItemsGroup', required: true }
});

export const InventoryItemModel = mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);