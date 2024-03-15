import { MESSAGES, HTTP_STATUS_CODE } from '../constants/index.js';

const { SOMETHING_WENT_WRONG } = MESSAGES;
const { INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

export const ErrorHandler = (err, _req, res, _next) => {
  const errMsg = `${err.name} - ${err.message}` || SOMETHING_WENT_WRONG;
  const errStatus = err.statusCode || INTERNAL_SERVER_ERROR;
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack
  });
};
