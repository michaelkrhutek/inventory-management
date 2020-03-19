import * as financialAccountService from '../services/financial-account-service';
import * as logService from '../services/log-service';
import { Router, Request, Response } from 'express';
import { IFinancialAccount } from '../models/financial-account-model';

export const router = Router();

router.post('/createfinancialaccount', (req: Request, res: Response) => {
    logService.logActivity(req);
    const name: string = req.query.name;
    const code: string = req.query.code;
    const accountType: string = req.query.accountType;
    const financialUnitId: string = req.query.financialUnitId;
    console.log(name, code, financialUnitId);
    if (!name || !code || !accountType || !financialUnitId) {
        res.status(400).send('Missing URL parameter(s)');
    }
    financialAccountService.createFinancialAccount(name, code, accountType, financialUnitId).then((financialAccount: IFinancialAccount) => {
        res.status(200).send(financialAccount);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});

router.get('/getallfinancialaccounts', (req: Request, res: Response) => {
    logService.logActivity(req);
    const financialUnitId: string = req.query.financialUnitId;
    if (!financialUnitId) {
        res.status(400).send('Missing URL parameter: financialUnitId');
    }
    financialAccountService.getAllFinancialAccounts(financialUnitId).then((financialAccounts: IFinancialAccount[]) => {
        res.status(200).send(financialAccounts);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});