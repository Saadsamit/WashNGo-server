import { Schema, model } from 'mongoose';
import { TUserModel, Tuser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const userRole = ['admin', 'user'];

const userSchema = new Schema<Tuser, TUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: userRole,
      default: 'user',
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
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

userSchema.statics.isUserExsit = async function (email: string) {
  return await user.findOne(
    { email },
    'password email name address phone role',
  );
};

userSchema.statics.isPasswordMatched = async function (
  textPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(textPassword, hashPassword);
};

const user = model<Tuser, TUserModel>('user', userSchema);

export default user;
