import { GET, HOTEL, HTTP_STATUS_CODE, MESSAGES } from '../constants/index.js';
import { errorResponse } from '../helpers/index.js';

const { FORBIDDEN } = HTTP_STATUS_CODE;
const { ACCESS_DENIED } = MESSAGES;

export const CheckRole = (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    const requestPathSplit = req.originalUrl.split('/');
    const requestPathLastPart = requestPathSplit[requestPathSplit.length - 1];

    if (requestPathLastPart === HOTEL && req.method !== GET && !isAdmin) {
      return errorResponse(res, FORBIDDEN, ACCESS_DENIED);
    }
    next();
  } catch (err) {
    next(err);
  }
};
