import { Document } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IActivityLog extends Document {
    url: string;
    params: Object;
    body: Object;
    time: Date;
};

export const ActivityLogSchema = new mongoose.Schema({
    url: { type: String, required: true },
    params: Object,
    body: Object,
    time: { type: Date, required: true }
});

export const ActivityLogModel = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);