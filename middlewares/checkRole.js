import { HTTP_STATUS_CODE, MESSAGES, ROLE_TO_API_PATH_MAPPING } from '../constants/index.js';
import { errorResponse, formatPath } from '../helpers/index.js';

const { FORBIDDEN } = HTTP_STATUS_CODE;
const { ACCESS_DENIED } = MESSAGES;

export const CheckRole = (req, res, next) => {
  try {
    if (req.path.includes('api-docs')) next();
    else {
      const reqPath = formatPath(req.path);
      const userRole = req.user.role;
      const rolesArr = ROLE_TO_API_PATH_MAPPING[userRole].filter((x) => x.path === reqPath && x.method === req.method);
      const isAuthorized = (rolesArr.length && true) || false;

      if (!isAuthorized) {
        return errorResponse(res, FORBIDDEN, ACCESS_DENIED);
      }
      next();
    }
  } catch (err) {
    next(err);
  }
};
