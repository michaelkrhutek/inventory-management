export interface IInventoryItem {
    _id: string;
    name: string;
    inventoryItemsGroupId: string;    
}

export class InventoryItem {

    constructor(data: IInventoryItem) {
        this._id = data._id;
        this.name = data.name;
        this.inventoryItemsGroupId = data.inventoryItemsGroupId;
    }

    _id: string;
    name: string;
    inventoryItemsGroupId: string;
}