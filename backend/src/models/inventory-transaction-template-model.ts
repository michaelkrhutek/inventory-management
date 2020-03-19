import { Document, Schema } from 'mongoose';
import { mongoose } from './mongoose-instance';
import { InventoryTransactionType } from '../../../interfaces/inventory-transaction-type'

export interface IInventoryTransactionTemplate extends Document {
    name: string;
    transactionType: InventoryTransactionType;
    inventoryItemsGroupId: string;
    debitAccountId: string;
    creditAccountId: string;
};

export const InventoryTransactionTemplateSchema = new mongoose.Schema({
    name: String,
    transactionType: String,
    inventoryItemsGroupId: { type: Schema.Types.ObjectId, ref: 'InventoryItemsGroup', required: true },
    debitAccountId: { type: Schema.Types.ObjectId, ref: 'FinancialAccount', required: true },
    creditAccountId: { type: Schema.Types.ObjectId, ref: 'FinancialAccount', required: true },
});

export const InventoryTransactionTemplateModel = mongoose.model<IInventoryTransactionTemplate>('InventoryTransactionTemplate', InventoryTransactionTemplateSchema);