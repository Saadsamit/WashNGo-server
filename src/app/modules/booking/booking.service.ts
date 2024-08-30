import { Request } from 'express';
import TBooking from './booking.interface';
import service from '../services/service.model';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import slot from '../slots/slot.model';
import mongoose from 'mongoose';
import user from '../user/user.model';
import booking from './booking.model';
import moment from 'moment';
import axios from 'axios';
import config from '../../config';

const createBookingDB = async (req: Request, payload: TBooking) => {
  const { email, name, address, phone } = req.user;
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
    const price = Number(isServiceExist?.price) * 100;

    const bookingData = await booking
      .findById((await createBooking)._id)
      .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
      .session(session);

    const formData = {
      signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
      store_id: 'aamarpaytest',
      tran_id: bookingData?._id,
      success_url: `${req.protocol + '://' + req.get('Host') + req.baseUrl}/payment/confirm`,
      fail_url: `${req.protocol + '://' + req.get('Host') + req.baseUrl}/payment/fail?bookingId=${bookingData?._id}`,
      cancel_url: `${config.url}/payment/cancel/${bookingData?._id}`,
      amount: price,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: name,
      cus_email: email,
      cus_add1: address,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: phone,
      type: 'json',
    };

    const { data } = await axios.post(
      'https://sandbox.aamarpay.com/jsonpost.php',
      formData,
    );
    if (data.result !== 'true') {
      let errorMessage = '';
      for (const key in data) {
        errorMessage += data[key] + '. ';
      }
      throw new AppError(httpStatus.BAD_REQUEST, errorMessage);
    }

    await session.commitTransaction();
    await session.endSession();
    return data;

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
  const date = moment(new Date(Date.now())).format('L');
  const mode = req.query?.mode;
  const customer = await user.findOne({ email });
  let query = {};
  if (mode === 'past') {
    query = {
      bookingDate: {
        $lt: date,
      },
    };
  }
  if (mode === 'upcoming') {
    query = {
      bookingDate: {
        $gte: date,
      },
    };
  }
  if (mode === 'nav') {
    const bookingList = await booking
      .findOne({
        customer: customer?._id,
        bookingDate: {
          $gte: date,
        },
      })
      .select('slot')
      .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
      .sort('-bookingDate');
    return bookingList;
  }
  const bookingList = await booking
    .find({ customer: customer?._id, ...query })
    .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
    .sort('-bookingDate');
  return bookingList;
};

export const bookingService = {
  createBookingDB,
  allBookingDB,
  userBookingDB,
};
