import { Request } from 'express';
import TBooking from './booking.interface';
import service from '../services/service.model';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import slot from '../slots/slot.model';
import mongoose from 'mongoose';
import user from '../user/user.model';
import booking from './booking.model';

const createBookingDB = async (req: Request, payload: TBooking) => {
  const email = req?.user?.email;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const isServiceExist = await service.findOne({
      _id: payload.service,
      isDeleted: false,
    });

    if (!isServiceExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'The service not found.');
    }

    const isSlotExist = await slot.findOne({
      _id: payload.slot,
      service: payload.service,
    });
    const customer = await user.findOne({ email });

    if (!isSlotExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'The slot not found.');
    } else if (!customer) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user not found.');
    } else if (isSlotExist.isBooked === 'booked') {
      throw new AppError(httpStatus.NOT_FOUND, 'The slot already booked');
    }

    payload.customer = customer._id;

    const updateStatus = await slot.findByIdAndUpdate(
      payload.slot,
      { isBooked: 'booked' },
      { new: true, session },
    );

    if (!updateStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update slot');
    }

    const newBooking = new booking(payload);
    const createBooking = newBooking.save({ session });

    if (!createBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to make booking');
    }
    const bookingData = await booking
      .findById((await createBooking)._id)
      .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
      .session(session);

    await session.commitTransaction();
    await session.endSession();
    return bookingData;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const allBookingDB = async () => {
  const allBooking = await booking
    .find()
    .sort('-createdAt')
    .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'service', select: '-createdAt -updatedAt -__v' });
  return allBooking;
};

const userBookingDB = async (req: Request) => {
  const email = req.user?.email;
  const customer = await user.findOne({ email });
  const bookingList = await booking
    .find({ customer: customer?._id })
    .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'service', select: '-createdAt -updatedAt -__v' });
  return bookingList;
};

export const bookingService = {
  createBookingDB,
  allBookingDB,
  userBookingDB,
};
