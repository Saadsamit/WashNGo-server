import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  token?: null | string;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  if (!data?.token) delete data.token;

  res.status(data?.statusCode).json(data);
};

export default sendResponse;
