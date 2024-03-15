import { errorResponse } from '../helpers/index.js';
import { HTTP_STATUS_CODE } from '../constants/index.js';

const { UNPROCESSABLE_ENTITY } = HTTP_STATUS_CODE;

export const JoiValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const errorMsgs = details.map((i) => i.message).join(',');
      errorResponse(res, UNPROCESSABLE_ENTITY, errorMsgs);
    }
  };
};
