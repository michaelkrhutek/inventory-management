import * as inventoryItemsGroupService from '../services/inventory-items-group-service';
import * as logService from '../services/log-service';
import { Router, Request, Response } from 'express';
import { IInventoryItemsGroup } from '../models/inventory-items-group-model';

export const router = Router();

router.post('/createinventoryitemsgroup', (req: Request, res: Response) => {
    logService.logActivity(req);
    const name: string = req.query.name;
    const financialUnitId: string = req.query.financialUnitId;
    console.log(name, financialUnitId);
    if (!name || !financialUnitId) {
        res.status(400).send('Missing URL parameter(s)');
    }
    inventoryItemsGroupService.createInventoryItemsGroup(name, financialUnitId).then((inventoryItemsGroup: IInventoryItemsGroup) => {
        res.status(200).send(inventoryItemsGroup);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});

router.get('/getallinventoryitemsgroups', (req: Request, res: Response) => {
    logService.logActivity(req);
    const financialUnitId: string = req.query.financialUnitId;
    if (!financialUnitId) {
        res.status(400).send('Missing URL parameter: financialUnitId');
    }
    inventoryItemsGroupService.getAllInventoryItemsGroup(financialUnitId).then((inventoryItemsGroups: IInventoryItemsGroup[]) => {
        res.status(200).send(inventoryItemsGroups);
    }).catch((err) => {
        res.status(500).send(err);
    });
});