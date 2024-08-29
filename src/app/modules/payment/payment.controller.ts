import { RequestHandler } from 'express';
import booking from '../booking/booking.model';
import slot from '../slots/slot.model';

const confirmPayment: RequestHandler = (req, res) => {
  res.send('<h1>Payment successfull</h1>');
};

const failPayment: RequestHandler = async (req, res, next) => {
  const id = req.query?.bookingId;
  try {
    const findBooking = await booking.findById(id);

    await slot.findByIdAndUpdate(findBooking?.slot, { isBooked: 'available' });

    await booking.findByIdAndDelete(id)

    res.send('<h1>Payment fail</h1>');
  } catch (err) {
    next(err);
  }
};

export const paymentController = { confirmPayment, failPayment };
