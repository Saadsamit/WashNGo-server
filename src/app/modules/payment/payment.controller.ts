import { RequestHandler } from 'express';
import booking from '../booking/booking.model';
import slot from '../slots/slot.model';
import config from '../../config';

const confirmPayment: RequestHandler = (req, res) => {
  res.redirect(`${config.url}/payment/success`);
};

const failPayment: RequestHandler = async (req, res, next) => {
  const id = req.query?.bookingId;
  try {
    const findBooking = await booking.findById(id);

    await slot.findByIdAndUpdate(findBooking?.slot, { isBooked: 'available' });

    await booking.findByIdAndDelete(id);

    res.redirect(`${config.url}/payment/fail`);
  } catch (err) {
    next(err);
  }
};

const cancelPayment: RequestHandler = async (req, res, next) => {
  const id = req.params?.id;
  try {
    const findBooking = await booking.findById(id);

    if (!findBooking) {
      res.json({ success: true });
      return;
    }

    await slot.findByIdAndUpdate(findBooking?.slot, { isBooked: 'available' });

    await booking.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const paymentController = { confirmPayment, failPayment, cancelPayment };
