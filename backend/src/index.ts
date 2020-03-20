import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { router as userRouter } from './routes/user-route';
import { router as financialUnitRouter } from './routes/financial-unit-route';
import { router as financialAccountRouter } from './routes/financial-account-route';
import { router as financialPeriodRouter } from './routes/financial-period-route';
import { router as inventoryItemsGroupRouter } from './routes/inventory-items-group-route';
import { router as inventoryItemsRouter } from './routes/inventory-item-route';

const app = express();

app.use(cors({ origin: '*' }));

app.use('/api/user', userRouter);
app.use('/api/financialunit', financialUnitRouter);
app.use('/api/financialaccount', financialAccountRouter);
app.use('/api/financialperiod', financialPeriodRouter);
app.use('/api/inventoryitemsgroup', inventoryItemsGroupRouter);
app.use('/api/inventoryitem', inventoryItemsRouter);

app.get("/", (_req: Request, res: Response) => {
  console.log('Request at / route received');
  res.send('<p>Express works</p>');
});

app.listen(8080, function() {
  console.log("listening on *:8080");
});

