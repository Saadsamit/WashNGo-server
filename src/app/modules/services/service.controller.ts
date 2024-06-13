import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { services } from './service.service';
import httpStatus from 'http-status';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await services.createUserDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Service created successfully',
    data: result,
  });
});

const serviceFindById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await services.FindByIdDB(id);

  sendResponse(res, {
    success: result ? true : false,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result ? 'Service retrieved successfully' : 'No Data Found',
    data: result ? result : {},
  });
});

const findServices = catchAsync(async (req: Request, res: Response) => {
  const result = await services.FindServicesDB();

  sendResponse(res, {
    success: result.length > 0 ? true : false,
    statusCode: result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
    message:
      result.length > 0 ? 'Services retrieved successfully' : 'No Data Found',
    data: result.length > 0 ? result : [],
  });
});

export const serviceController = {
  createService,
  serviceFindById,
  findServices,
};
