import { InventoryItemsGroupModel, IInventoryItemsGroup } from "../models/inventory-items-group-model";
import * as logService from './log-service';

export const isInventoryItemsGroupNameUnique = async (name: string, financialUnitId: string): Promise<boolean> => {
    return !(await InventoryItemsGroupModel.exists({ name, financialUnitId }).catch(() => true));
};

export const createInventoryItemsGroup = async (name: string, financialUnitId: string): Promise<IInventoryItemsGroup> => {
    const isNameUnique: boolean = await isInventoryItemsGroupNameUnique(name, financialUnitId);
    if (!isNameUnique) {
        throw('Name is already user by other inventory items group');
    }
    const inventoryItemsGroup = new InventoryItemsGroupModel({ name, financialUnitId });
    return await inventoryItemsGroup.save().catch((err) => {
        logService.logError(err);
        throw('Error while saving a financial unit to a database');
    });
}

export const getAllInventoryItemsGroup = async (financialUnitId: string): Promise<IInventoryItemsGroup[]> => {
    return await InventoryItemsGroupModel.find({ financialUnitId }).catch((err) => {
        logService.logError(err);
        throw('Error while listing all inventory items groups from a database');
    });
}