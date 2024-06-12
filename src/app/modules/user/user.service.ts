import Tuser from './user.interface';
import user from './user.model';

const createUserDB = async (payload: Tuser) => {
  const newUser = new user(payload);
  await newUser.save();
  return await user.findById(newUser._id);
};

export const userService = {
  createUserDB,
};
