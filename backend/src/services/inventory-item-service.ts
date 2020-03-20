import { InventoryItemModel, IInventoryItem } from "../models/inventory-item-model";
import * as logService from './log-service';

export const isInventoryItemNameUnique = async (name: string, financialUnitId: string): Promise<boolean> => {
    return !(await InventoryItemModel.exists({ name, financialUnitId }).catch(() => true));
};

export const createInventoryItem = async (
    name: string,
    inventoryItemsGroupId: string,
    financialUnitId: string): Promise<IInventoryItem> => {
    const isNameUnique: boolean = await isInventoryItemNameUnique(name, financialUnitId);
    if (!isNameUnique) {
        throw('Name is already used by other inventory item');
    }
    const inventoryItem = new InventoryItemModel({ name, financialUnitId, inventoryItemsGroupId });
    return await inventoryItem.save().catch((err) => {
        logService.logError(err);
        throw('Error while saving an inventory item to a database');
    });
}

export const getAllInventoryItems = async (financialUnitId: string): Promise<IInventoryItem[]> => {
    return await InventoryItemModel.find({ financialUnitId }).catch((err) => {
        logService.logError(err);
        throw('Error while listing all inventory items from a database');
    });
}