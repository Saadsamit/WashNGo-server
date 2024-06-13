import { TSlotQuery } from './slot.interface';
import slot from './slot.model';

const findSlotDB = async (query: TSlotQuery) => {
  return await slot
    .find({ isBooked: { $ne: 'booked' }, ...query })
    .populate('service');
};

export const slotService = {
  findSlotDB,
};
