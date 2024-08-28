import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { slotService } from './slot.service';
import httpStatus from 'http-status';

const findSlot = catchAsync(async (req: Request, res: Response) => {
  const service = req.query?.serviceId;
  const date = req.query?.date;
  let query = {};
  if (service) {
    query = { service };
  }
  if (date) {
    query = { ...query, date };
  }
  const result = await slotService.findSlotDB(query);

  sendResponse(res, {
    success: result.length > 0 ? true : false,
    statusCode: result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
    message:
      result.length > 0
        ? 'Available slots retrieved successfully'
        : 'No Data Found',
    data: result.length > 0 ? result : [],
  });
});

const updateSlotStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await slotService.updateSlotStatusDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'slot status update successfully',
    data: result,
  });
});

const findASlot = catchAsync(async (req: Request, res: Response) => {
  const result = await slotService.findASlotDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'find slot successfully',
    data: result,
  });
});

export const slotController = {
  findSlot,
  updateSlotStatus,
  findASlot,
};
