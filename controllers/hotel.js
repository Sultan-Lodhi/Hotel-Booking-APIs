import { successResponse, setDataInRedis, getDataFromRedis, deleteDataFromRedis } from '../helpers/index.js';
import { MESSAGES, MODELS, REDIS_KEYS } from '../constants/index.js';
import { deleteData, getAllData, insertSingleEntity, updateData } from '../services/index.js';
import { Op } from 'sequelize';

const { HOTELS_DATA } = REDIS_KEYS;
const { HOTELS, HOTEL_ROOMS } = MODELS;
const {
  HOTELS_FETCHED_SUCCESSFULLY,
  HOTEL_ADDED_SUCCESSFULLY,
  HOTEL_UPDATED_SUCCESSFULLY,
  HOTEL_DELETED_SUCCESSFULLY
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
    if (hotelName) hotelsData = hotelsData.filter((hotel) => hotel.hotelName && hotel.hotelName.includes(hotelName));
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
