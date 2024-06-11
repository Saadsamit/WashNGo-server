/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  const statusCode = 500;
  const message = 'Something went wrong!';
  if (err) {
    res.json({
      success: false,
      statusCode,
      message,
    });
  }
};

export default globalErrorHandler;
