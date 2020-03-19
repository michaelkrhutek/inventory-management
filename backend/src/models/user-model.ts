import { Document } from 'mongoose';
import { mongoose } from './mongoose-instance';

export interface IUser extends Document {
    name: string;
};

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);