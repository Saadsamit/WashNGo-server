import { Schema, model } from 'mongoose';
import Tuser from './user.interface';

export const userRole = ['admin', 'user'];

const userSchema = new Schema<Tuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: userRole,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const user = model<Tuser>('user', userSchema);

export default user;