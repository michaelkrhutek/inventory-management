import * as financialUnitService from '../services/financial-unit-service';
import * as logService from '../services/log-service';
import { Router, Request, Response } from 'express';
import { IFinancialUnit } from '../models/financial-unit-model';

export const router = Router();

router.post('/createfinancialunit', (req: Request, res: Response) => {
    logService.logActivity(req);
    const name: string = req.query.name;
    if (!name) {
        res.status(400).send('Missing URL parameter: name');
    }
    financialUnitService.createFinancialUnit(name).then((financialUnit: IFinancialUnit) => {
        financialUnit.id
        res.status(200).send(financialUnit);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/getallfinancialunits', (req: Request, res: Response) => {
    logService.logActivity(req);
    financialUnitService.getAllFinancialUnits().then((financialUnits: IFinancialUnit[]) => {
        res.status(200).send(financialUnits);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});

router.delete('/deletefinancialunit', (req: Request, res: Response) => {
    logService.logActivity(req);
    const id: string = req.query.id;
    if (!id) {
        res.status(400).send('Missing URL parameter: id');
    }
    financialUnitService.deleteFinancialUnitSoft(id).then(() => {
        res.status(200).send('Financial unit was deleted');
    }).catch((err) => {
        res.status(500).send(err);
    });
});