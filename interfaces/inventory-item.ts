import { IBasicDbModel } from "./basic-db-model";

export interface IInventoryItem extends IBasicDbModel {
    name: string;
    financialUnitGroupId: string;
    inventoryItemsGroupId: string;
}