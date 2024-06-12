/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_Role } from './user.const';

interface Tuser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
}

interface TuserLogin {
  email: string;
  password: string;
  role?: string;
}

interface TUserModel extends Model<Tuser> {
  isUserExsit(email: string): Promise<Tuser>;
  isPasswordMatched(
    textPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

type TUserRole = keyof typeof User_Role;

export { Tuser, TUserModel, TuserLogin, TUserRole };
