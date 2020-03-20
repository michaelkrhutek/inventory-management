export interface IInventoryItemsGroup {
    _id: string;
    name: string;
}

export class InventoryItemsGroup {

    constructor(data: IInventoryItemsGroup) {
        this._id = data._id;
        this.name = data.name;
    }

    _id: string;
    name: string;
}