import * as inventoryTransactionTemplateService from '../services/inventory-transaction-template-service';
import * as logService from '../services/log-service';
import { Router, Request, Response } from 'express';
import { IInventoryTransactionTemplate } from '../models/inventory-transaction-template-model';

export const router = Router();

router.post('/createinventorytransactiontemplate', (req: Request, res: Response) => {
    logService.logActivity(req);
    const name: string = req.query.name;
    const inventoryItemsGroupId: string = req.query.inventoryItemsGroupId;
    const debitAccountId: string = req.query.debitAccountId;
    const creditAccountId: string = req.query.creditAccountId;
    if (!name || !inventoryItemsGroupId || !debitAccountId || !creditAccountId) {
        res.status(400).send('Missing URL parameter(s)');
    }
    inventoryTransactionTemplateService.createInventoryTransactionTemplate(
        name, inventoryItemsGroupId, debitAccountId, creditAccountId
    ).then((inventoryTransactionTemplate: IInventoryTransactionTemplate) => {
        res.status(200).send(inventoryTransactionTemplate);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});

router.get('/getallinventoryitemsgroups', (req: Request, res: Response) => {
    logService.logActivity(req);
    const inventoryItemsGroupId: string = req.query.inventoryItemsGroupId;
    if (!inventoryItemsGroupId) {
        res.status(400).send('Missing URL parameter: inventoryItemsGroupId');
    }
    inventoryTransactionTemplateService.getAllInventoryTransactionTemplates(
        inventoryItemsGroupId
    ).then((inventoryTransactionTemplates: IInventoryTransactionTemplate[]) => {
        res.status(200).send(inventoryTransactionTemplates);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});