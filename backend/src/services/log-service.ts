import { Request } from 'express';
import { ErrorLogModel } from "../models/error-log-model"
import { ActivityLogModel } from '../models/activity-log-model';

export const logError = (error: any): void => {
    const time: Date = new Date();
    const errorLog = new ErrorLogModel({ error, time });
    errorLog.save().catch(() => null);
}

export const logActivity = (req: Request): void => {
    const time: Date = new Date();
    const url: string = req.url;
    const params: Object = req.query;
    const body: Object = req.body;
    const activityLog = new ActivityLogModel({ time, url, params, body });
    activityLog.save().catch(() => null);
} 