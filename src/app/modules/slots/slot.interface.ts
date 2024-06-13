import { Types } from 'mongoose';

type TBookingStatus = 'available' | 'booked' | 'canceled';

type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: TBookingStatus;
};

export { TSlot, TBookingStatus };
