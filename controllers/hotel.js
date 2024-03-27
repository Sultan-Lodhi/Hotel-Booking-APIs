import bcrypt from 'bcryptjs';
import {
  successResponse,
  errorResponse,
  setDataInRedis,
  getDataFromRedis,
  deleteDataFromRedis
} from '../helpers/index.js';
import { MESSAGES, MODELS, REDIS_KEYS, HTTP_STATUS_CODE } from '../constants/index.js';
import { deleteData, getAllData, insertSingleEntity, updateData, getSingleRecord } from '../services/index.js';
import { Op } from 'sequelize';

const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = HTTP_STATUS_CODE;
const { HOTELS_DATA } = REDIS_KEYS;
const { USERS, HOTELS, HOTEL_ROOMS, HOTEL_EMPLOYEES } = MODELS;
const {
  HOTELS_FETCHED_SUCCESSFULLY,
  HOTEL_ADDED_SUCCESSFULLY,
  HOTEL_UPDATED_SUCCESSFULLY,
  HOTEL_DELETED_SUCCESSFULLY,
  PASSWORDS_MISMATCH,
  USER_ALREADY_EXIST,
  EMPLOYEE_ADDED_SUCCESSFULLY
} = MESSAGES;

export const getHotelsData = async (req, res, next) => {
  try {
    const { hotelName } = req.query;
    let hotelsData = await getDataFromRedis(HOTELS_DATA);
    if (!hotelsData) {
      hotelsData = hotelName
        ? await getAllData(HOTELS, { hotelName: { [Op.like]: `%${hotelName}%` } })
        : await getAllData(HOTELS);
      setDataInRedis(HOTELS_DATA, hotelsData);
    }
    if (hotelName) {
      hotelsData = hotelsData.filter(
        (hotel) => hotel.hotelName && hotel.hotelName.toLowerCase().includes(hotelName.toLowerCase())
      );
    }
    hotelsData = hotelsData.map((data) => {
      const { id, hotelName, city, address, rating } = data;
      return { id, hotelName, city, address, rating };
    });
    successResponse(res, HOTELS_FETCHED_SUCCESSFULLY, hotelsData);
  } catch (err) {
    next(err);
  }
};

export const getHotelsDataV2 = async (req, res, next) => {
  try {
    const { hotelName, city } = req.query;
    let hotelsData = await getDataFromRedis(HOTELS_DATA);
    if (!hotelsData) {
      const whereCondition = {
        ...(hotelName && { hotelName: { [Op.like]: `%${hotelName}%` } }),
        ...(city && { city: { [Op.like]: `%${city}%` } })
      };
      hotelsData = Object.entries(whereCondition).length
        ? await getAllData(HOTELS, whereCondition)
        : await getAllData(HOTELS);
      setDataInRedis(HOTELS_DATA, hotelsData);
    }
    if (hotelName) {
      hotelsData = hotelsData.filter(
        (hotel) => hotel.hotelName && hotel.hotelName.toLowerCase().includes(hotelName.toLowerCase())
      );
    }
    if (city) {
      hotelsData = hotelsData.filter((hotel) => hotel.city && hotel.city.toLowerCase().includes(city.toLowerCase()));
    }
    successResponse(res, HOTELS_FETCHED_SUCCESSFULLY, hotelsData);
  } catch (err) {
    next(err);
  }
};

export const addNewHotel = async (req, res, next) => {
  try {
    const { hotelName, city, address, rating } = req.body;
    const createHotelData = { hotelName, city, address, rating };
    const createHotel = await insertSingleEntity(HOTELS, createHotelData);
    await updateHotelDataInRedis();
    successResponse(res, HOTEL_ADDED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

export const addHotelEmployee = async (req, res, next) => {
  try {
    const { email, mobile, password, confirmPassword, userName, role, hotelId } = req.body;

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
      role
    };

    const newUser = await insertSingleEntity(USERS, newUserData);

    const hotelEmployeeData = {
      hotelId,
      employeeId: newUser.id
    };
    const addEmployee = await insertSingleEntity(HOTEL_EMPLOYEES, hotelEmployeeData);

    successResponse(res, EMPLOYEE_ADDED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

export const updateHotelData = async (req, res, next) => {
  try {
    const { id, hotelName, city, address, rating } = req.body;
    const updateHotelData = {
      ...(hotelName && { hotelName }),
      ...(city && { city }),
      ...(address && { address }),
      ...(rating && { rating })
    };
    const updateDataResult = await updateData(HOTELS, updateHotelData, { id });
    await updateHotelDataInRedis();
    successResponse(res, HOTEL_UPDATED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

export const deleteHotelData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteHotelRooms = await deleteData(HOTEL_ROOMS, { hotelId: id });
    const deleteHotel = await deleteData(HOTELS, { id });
    await updateHotelDataInRedis();
    successResponse(res, HOTEL_DELETED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

const updateHotelDataInRedis = async () => {
  const [hotelsData, _deletedRedisData] = await Promise.all([getAllData(HOTELS), deleteDataFromRedis(HOTELS_DATA)]);
  setDataInRedis(HOTELS_DATA, hotelsData);
};
