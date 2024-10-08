import { Request } from 'express';
import { TSlotQuery } from './slot.interface';
import slot from './slot.model';

const findSlotDB = async (query: TSlotQuery) => {
  return await slot
    .find({ isBooked: { $ne: 'booked' }, ...query })
    .populate('service');
};

const updateSlotStatusDB = async (req: Request) => {
  const id = req.params.id;
  const isBooked = req?.body?.status;
  return await slot.findByIdAndUpdate(id, { isBooked });
};

const findASlotDB = async (req: Request) => {
  const id = req.params.id;
  return await slot.findById(id).populate('service');
};

export const slotService = {
  findSlotDB,
  updateSlotStatusDB,
  findASlotDB,
};
