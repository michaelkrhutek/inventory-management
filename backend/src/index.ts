import express from 'express';
import { Request, Response } from 'express';
import { router as userRouter } from './routes/user-route';
import { router as financialUnitRouter } from './routes/financial-unit-route';

const app = express();

app.use(userRouter);
app.use(financialUnitRouter);

app.get("/", (_req: Request, res: Response) => {
  console.log('Request at / route received');
  res.send('<p>Express works</p>');
});

app.listen(8080, function() {
  console.log("listening on *:8080");
});

