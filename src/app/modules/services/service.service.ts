import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import TService from './service.interface';
import service from './service.model';
import { Request } from 'express';

const createUserDB = async (payload: TService) => {
  if (payload?.isDeleted) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'you cant give isDeleted value true set the value false.',
    );
  }
  const newUser = new service(payload);
  return await newUser.save();
};

const FindByIdDB = async (_id: string) => {
  return await service.findOne({ _id, isDeleted: false });
};

const FindServicesDB = async () => {
  return await service.find({ isDeleted: false });
};

const updateServiceDB = async (_id: string, payload: Partial<TService>) => {
  const isExist = await service.findById({ _id, isDeleted: false });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
  } else if (payload?.isDeleted) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'you cant modify isDeleted property.',
    );
  }
  await service.findByIdAndUpdate({ _id }, payload);
  return await service.findById(_id);
};

const deleteServiceDB = async (_id: string) => {
  const isExist = await service.findById({ _id, isDeleted: false });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
  }
  await service.findByIdAndUpdate({ _id }, { isDeleted: true });
  return await service.findById(_id);
};

const createSlotDB = async (req: Request) => {
  return req.body;
};

export const services = {
  createUserDB,
  FindByIdDB,
  FindServicesDB,
  updateServiceDB,
  deleteServiceDB,
  createSlotDB,
};
