import { InventoryTransactionTemplateModel, IInventoryTransactionTemplate } from "../models/inventory-transaction-template-model";
import * as logService from './log-service';

export const isInventoryTransactionTemplateNameUnique = async (name: string, inventoryItemsGroupId: string): Promise<boolean> => {
    return !(await InventoryTransactionTemplateModel.exists({ name, inventoryItemsGroupId }).catch(() => true));
};

export const createInventoryTransactionTemplate = async (
    name: string,
    inventoryItemsGroupId: string,
    debitAccountId: string,
    creditAccountId: string
): Promise<IInventoryTransactionTemplate> => {
    const isNameUnique: boolean = await isInventoryTransactionTemplateNameUnique(name, inventoryItemsGroupId);
    if (!isNameUnique) {
        throw('Name is already used by other inventory transaction template');
    }
    const inventoryTransactionTemplate = new InventoryTransactionTemplateModel({ name, inventoryItemsGroupId, debitAccountId, creditAccountId });
    return await inventoryTransactionTemplate.save().catch((err) => {
        logService.logError(err);
        throw('Error while saving an inventory transaction template to a database');
    });
}

export const getAllInventoryTransactionTemplates = async (inventoryItemsGroupId: string): Promise<IInventoryTransactionTemplate[]> => {
    return await InventoryTransactionTemplateModel.find({ inventoryItemsGroupId }).catch((err) => {
        logService.logError(err);
        throw('Error while listing inventory transaction templates from a database');
    });
}