import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import TService from './service.interface';
import service from './service.model';
import { TSlot } from '../slots/slot.interface';
import slot from '../slots/slot.model';
import { Request } from 'express';
import moment from 'moment';

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

const FindServicesDB = async (req: Request) => {
  const limit = Number(req.query?.limit);
  const sort =
    (req.query?.sort as string)?.split(',').join(' ') || '-createdAt';
  const search = req.query?.search;
  let query = {};

  if (search) {
    query = { name: { $regex: search, $options: 'i' } };
  }

  const serviceQuery = service.find({ isDeleted: false, ...query }).sort(sort);

  if (limit) {
    return await serviceQuery.limit(limit);
  }
  return await serviceQuery;
};

const updateServiceDB = async (_id: string, payload: Partial<TService>) => {
  const isExist = await service.findById({ _id, isDeleted: false });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
  } else if (payload?.isDeleted) {
    throw new AppError(
      httpStatus.NOT_MODIFIED,
      'you cant modify isDeleted property.',
    );
  }
  await service.findByIdAndUpdate({ _id }, payload);
  return await service.findById(_id);
};

const deleteServiceDB = async (_id: string) => {
  const isExist = await service.findOne({ _id, isDeleted: false });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
  }
  await service.findByIdAndUpdate({ _id }, { isDeleted: true });
  return await service.findById(_id);
};

const createSlotDB = async (payload: TSlot) => {
  if (payload?.isBooked && payload?.isBooked !== 'available')
    payload.isBooked = 'available';

  const isExist = await service.findOne({
    _id: payload.service,
    isDeleted: false,
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
  }
  if (!moment(moment().format('L')).isSameOrBefore(moment(payload.date).format('L'))) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'select current date or upcoming date',
    );
  }
  const startTimeHour = Number(payload.startTime.split(':')[0]);
  const startTimeMin = Number(payload.startTime.split(':')[1]);
  const endTimeHour = Number(payload.endTime.split(':')[0]);
  const endTimeMin = Number(payload.endTime.split(':')[1]);

  if (
    moment(moment().format('HH:mm'), 'HH:mm').isSameOrAfter(
      moment(payload?.startTime, 'HH:mm'),
    )
  ) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'start Time must be bigger then latest Time',
    );
  }
  if (startTimeHour > endTimeHour) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'endTime must be bigger then startTime',
    );
  } else if (startTimeHour === endTimeHour) {
    if (startTimeMin === endTimeMin || startTimeMin > endTimeMin) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        'endTime must be bigger then startTime',
      );
    }
  }

  const startMin = startTimeHour * 60 + startTimeMin;
  const endMin = endTimeHour * 60 + endTimeMin;
  let totalDuration = endMin - startMin;

  if (isExist.duration > totalDuration) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      `Time must be bigger then duration. The duration is ${isExist.duration}`,
    );
  }
  totalDuration = Math.floor(totalDuration / isExist.duration);
  const totalSlot = [...Array(totalDuration).keys()];
  const slots: TSlot[] = [];
  totalSlot.forEach((val) => {
    const currentValue = Number(val);
    const startTimeMinutes = startMin + currentValue * isExist.duration;
    const startHour = Math.floor(startTimeMinutes / 60);
    const startMinInHour = startTimeMinutes % 60;
    const endTimeMinutes = startMin + (currentValue + 1) * isExist.duration;
    const endHour = Math.floor(endTimeMinutes / 60);
    const endMinInHour = endTimeMinutes % 60;

    const TimeStart = `${startHour.toString().padStart(2, '0')}:${startMinInHour.toString().padStart(2, '0')}`;
    const TimeEnd = `${endHour.toString().padStart(2, '0')}:${endMinInHour.toString().padStart(2, '0')}`;

    const myData: TSlot = {
      service: payload.service,
      date: payload.date,
      startTime: TimeStart,
      endTime: TimeEnd,
    };

    slots.push(myData);
  });

  return await slot.insertMany(slots);
};

const serviceSlotsDB = async (req: Request) => {
  const serviceId = req.params.id;
  const date = moment(req.params.date).format('L');
  const isExist = await service.find({ _id: serviceId, isDeleted: false });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
  }
  const result = await slot.find({
    service: serviceId,
    date: {
      $eq: date,
    },
  });

  return result;
};

export const services = {
  createUserDB,
  FindByIdDB,
  FindServicesDB,
  updateServiceDB,
  deleteServiceDB,
  createSlotDB,
  serviceSlotsDB,
};
