import TService from './service.interface';
import service from './service.model';

const createUserDB = async (payload: TService) => {
  const newUser = new service(payload);
  return await newUser.save();
};

const FindByIdDB = async (_id: string) => {
  return await service.findOne({ _id, isDeleted: false });
};

const FindServicesDB = async () => {
  return await service.find({ isDeleted: false });
};

export const services = {
  createUserDB,
  FindByIdDB,
  FindServicesDB,
};
