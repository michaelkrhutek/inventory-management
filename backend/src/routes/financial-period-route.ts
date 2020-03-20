import * as financialPeriodService from '../services/financial-period-service';
import * as logService from '../services/log-service';
import { Router, Request, Response } from 'express';
import { IFinancialPeriod } from '../models/financial-period-model';

export const router = Router();

router.post('/createfinancialperiod', (req: Request, res: Response) => {
    logService.logActivity(req);
    const startDateString: string = req.query.startDate;
    const endDateString: string = req.query.endDate;
    const financialUnitId: string = req.query.financialUnitId;
    if (!startDateString || !endDateString || !financialUnitId) {
        res.status(400).send('Missing URL parameter(s)');
    }
    if (isNaN(Date.parse(startDateString)) || isNaN(Date.parse(endDateString))) {
        res.status(400).send('Date(s) in invalid format');
    }
    const startDate: Date = new Date(startDateString);
    const endDate: Date = new Date(endDateString);
    financialPeriodService.createFinancialPeriod(startDate, endDate, financialUnitId).then((financialAccount: IFinancialPeriod) => {
        res.status(200).send(financialAccount);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});

router.get('/getallfinancialperiods', (req: Request, res: Response) => {
    logService.logActivity(req);
    const financialUnitId: string = req.query.financialUnitId;
    if (!financialUnitId) {
        res.status(400).send('Missing URL parameter: financialUnitId');
    }
    financialPeriodService.getAllFinancialPeriods(financialUnitId).then((financialPeriods: IFinancialPeriod[]) => {
        res.status(200).send(financialPeriods);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});