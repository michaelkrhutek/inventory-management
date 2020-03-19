import { Document } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IErrorLog extends Document {
    name: string;
    time: Date;
};

export const ErrorLogSchema = new mongoose.Schema({
    error: { type: Object },
    time: Date
});

export const ErrorLogModel = mongoose.model<IErrorLog>('ErrorLog', ErrorLogSchema);