import { Schema, model } from 'mongoose';
import Tuser from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const userRole = ['admin', 'user'];

const userSchema = new Schema<Tuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.Bcrypt_Hash_Round),
  );
  next();
});

const user = model<Tuser>('user', userSchema);

export default user;
