import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { environment } from '../config/environment.js';
import { successResponse, errorResponse } from '../helpers/index.js';
import { HTTP_STATUS_CODE, MESSAGES, TOKEN_EXPIRY_TIME } from '../constants/index.js';
import { getSingleRecord, insertSingleEntity, updateData } from '../services/index.js';
import { MODELS } from '../constants/index.js';

const { USERS } = MODELS;
const { BAD_REQUEST, UNPROCESSABLE_ENTITY, NOT_FOUND, UNAUTHORIZED } = HTTP_STATUS_CODE;
const {
  PASSWORDS_MISMATCH,
  USER_ALREADY_EXIST,
  USER_REGISTRATION_SUCCESSFUL,
  USER_LOGIN_SUCCESSFUL,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS
} = MESSAGES;

export const userRegisteration = async (req, res, next) => {
  try {
    const { email, mobile, password, confirmPassword, userName, isAdmin } = req.body;

    if (password !== confirmPassword) return errorResponse(res, BAD_REQUEST, PASSWORDS_MISMATCH);

    // Check if user exists or not
    const userData = await getSingleRecord(USERS, { email, mobile });
    if (userData) return errorResponse(res, UNPROCESSABLE_ENTITY, USER_ALREADY_EXIST);

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUserData = {
      userName,
      email,
      mobile,
      password: hashedPassword,
      isAdmin
    };

    const newUser = await insertSingleEntity(USERS, newUserData);

    successResponse(res, USER_REGISTRATION_SUCCESSFUL);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { userEmailMobile, password } = req.body;

    const user = await getSingleRecord(USERS, { [Op.or]: { email: userEmailMobile, mobile: userEmailMobile } });
    if (!user) return errorResponse(res, NOT_FOUND, USER_NOT_FOUND);

    const { id, userName, email, mobile, isAdmin, isActive } = user;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return errorResponse(res, UNAUTHORIZED, INVALID_CREDENTIALS);

    const token = jwt.sign({ id, isAdmin }, environment.jwtSecretKey, {
      expiresIn: TOKEN_EXPIRY_TIME
    });

    const updateToken = await updateData(USERS, { token }, { id });

    const data = { token, user: { id, userName, email, mobile, isAdmin, isActive } };

    successResponse(res, USER_LOGIN_SUCCESSFUL, data);
  } catch (err) {
    next(err);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const userId = req.id;
    const logoutUser = await updateData(USERS, { token: 0 }, { id: userId });

    successResponse(res, USER_LOGIN_SUCCESSFUL, data);
  } catch (err) {
    next(err);
  }
};
