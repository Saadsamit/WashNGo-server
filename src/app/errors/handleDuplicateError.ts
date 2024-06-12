import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessages: TErrorSources = [
    {
      path: '',
      message: err?.errorResponse?.errmsg,
    },
  ];
  return {
    statusCode: 400,
    message: err?.errorResponse?.errmsg,
    errorMessages,
  };
};

export default handleDuplicateError;
