import * as financialUnitService from '../services/financial-unit-service'
import { Router, Request, Response } from 'express';
import { IFinancialUnit } from '../models/financial-unit-model';

export const router = Router();

router.get('/financialunit/createfinancialunit', (req: Request, res: Response) => {
    console.log('Request at /financialunit/createfinancialunit route received');
    const name: string = req.query.name;
    if (!name) {
        res.status(400).send('Missing URL parameter: name');
    }
    financialUnitService.createFinancialUnit(name).then((financialUnit: IFinancialUnit) => {
        res.status(200).send(financialUnit);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/financialunit/getallfinancialunits', (_req: Request, res: Response) => {
    console.log('Request at /financialunit/getallfinancialunits route received');
    financialUnitService.getAllFinancialUnits().then((financialUnits: IFinancialUnit[]) => {
        res.status(200).send(financialUnits);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/financialunit/deletefinancialunit', (req: Request, res: Response) => {
    const id: string = req.query.id;
    if (!id) {
        res.status(400).send('Missing URL parameter: id');
    }
    financialUnitService.deleteFinancialUnitSoft(id).then(() => {
        res.status(200).send('Financial unit was deleted');
    }).catch((err) => {
        res.status(500).send(err);
    });
})