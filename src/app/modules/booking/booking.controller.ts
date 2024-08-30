import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const bookingData = {
    service: data.serviceId,
    slot: data.slotId,
    bookingDate: data.bookingDate,
    vehicleType: data.vehicleType,
    vehicleBrand: data.vehicleBrand,
    vehicleModel: data.vehicleModel,
    manufacturingYear: data.manufacturingYear,
    registrationPlate: data.registrationPlate,
  };

  const result = await bookingService.createBookingDB(req, bookingData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successful',
    data: result,
  });
});

const allBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.allBookingDB();

  sendResponse(res, {
    success: result.length > 0 ? true : false,
    statusCode: result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
    message:
      result.length > 0
        ? 'All bookings retrieved successfully'
        : 'No Data Found',
    data: result.length > 0 ? result : [],
  });
});

const userBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.userBookingDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  allBooking,
  userBooking,
};
