import { Mongoose, Document } from 'mongoose';
import { connectionUrl } from '../../connection-url';

const mongoose = new Mongoose();

mongoose.connect(connectionUrl, { useUnifiedTopology: true });

mongoose.connect(connectionUrl, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
});

export interface IUser extends Document {
    name: string;
};

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);