import { HTTP_STATUS_CODE, MESSAGES } from '../constants/index.js';
import { errorResponse } from '../helpers/index.js';

const { BAD_REQUEST } = HTTP_STATUS_CODE;
const { API_VERSION_MISSING } = MESSAGES;

export const CheckApiVersion = (version) => {
  return (req, res, next) => {
    try {
      const apiVersion = req.headers['x-accept-version'];

      if (!apiVersion) return errorResponse(res, BAD_REQUEST, API_VERSION_MISSING);
      if (apiVersion == version) return next();

      return next('route');
    } catch (err) {
      next(err);
    }
  };
};
