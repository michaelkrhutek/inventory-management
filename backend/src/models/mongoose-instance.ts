import { Mongoose } from 'mongoose';
import { connectionUrl } from '../../connection-url';

export const mongoose = new Mongoose();

mongoose.connect(connectionUrl, { useUnifiedTopology: true });

mongoose.connect(connectionUrl, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
});