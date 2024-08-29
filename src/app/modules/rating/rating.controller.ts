import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ratingService } from './rating.service';

const findAllRating = catchAsync(async (req: Request, res: Response) => {
  const result = await ratingService.findAllRatingDB(req);

  sendResponse(res, {
    success: result.data.length > 0 ? true : false,
    statusCode: httpStatus.OK,
    message:
      result.data.length > 0
        ? 'retrieved all feedback successfully'
        : 'No Data Found',
    feedbackExsit: result.feedbackExsit,
    data: result.data.length > 0 ? result.data : [],
  });
});

const createRating = catchAsync(async (req: Request, res: Response) => {
  const result = await ratingService.createRatingDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'feedback added successfully',
    data: result,
  });
});

export const ratingController = {
  findAllRating,
  createRating,
};
