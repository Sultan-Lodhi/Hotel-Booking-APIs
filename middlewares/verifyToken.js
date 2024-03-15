import jwt from 'jsonwebtoken';
import { errorResponse } from '../helpers/index.js';
import { HTTP_STATUS_CODE, MESSAGES, MODELS } from '../constants/index.js';
import { environment } from '../config/environment.js';
import { getSingleRecord } from '../services/index.js';

const { FORBIDDEN, UNAUTHORIZED } = HTTP_STATUS_CODE;
const { ACCESS_DENIED, SESSION_EXPIRED } = MESSAGES;
const { USERS } = MODELS;

export const VerifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return errorResponse(res, FORBIDDEN, ACCESS_DENIED);

  jwt
    .verify(token, environment.jwtSecretKey, async (err, decodedToken) => {
      if (err) {
        return errorResponse(res, UNAUTHORIZED, SESSION_EXPIRED);
      }
      req.userId = decodedToken.id;
      const userData = await getSingleRecord(USERS, { id: decodedToken.id });
      const { id, userName, email, mobile, isActive, isAdmin } = userData;
      req.user = { id, userName, email, mobile, isActive, isAdmin };
      next();
    })
    .catch((err) => next(err));
};
