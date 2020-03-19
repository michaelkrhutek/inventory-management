import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { router as userRouter } from './routes/user-route';
import { router as financialUnitRouter } from './routes/financial-unit-route';
import { router as financialAccountRouter } from './routes/financial-account-route';

const app = express();

app.use(cors({ origin: '*' }));

app.use('/user', userRouter);
app.use('/financialunit', financialUnitRouter);
app.use('/financialaccount', financialAccountRouter);

app.get("/", (_req: Request, res: Response) => {
  console.log('Request at / route received');
  res.send('<p>Express works</p>');
});

app.listen(8080, function() {
  console.log("listening on *:8080");
});

