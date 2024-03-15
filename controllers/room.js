import {
  errorResponse,
  getDataFromRedis,
  setDataInRedis,
  successResponse,
  deleteDataFromRedis
} from '../helpers/index.js';
import { MESSAGES, MODELS, HTTP_STATUS_CODE, REDIS_KEYS } from '../constants/index.js';
import { deleteData, getAllData, getSingleRecord, insertSingleEntity, updateData } from '../services/index.js';

const { HOTEL_ROOMS } = MODELS;
const { ROOMS_DATA } = REDIS_KEYS;
const { UNPROCESSABLE_ENTITY } = HTTP_STATUS_CODE;
const {
  ROOMS_FETCHED_SUCCESSFULLY,
  ROOM_ADDED_SUCCESSFULLY,
  ROOM_UPDATED_SUCCESSFULLY,
  ROOM_DELETED_SUCCESSFULLY,
  ROOM_ALREADY_EXISTS
} = MESSAGES;

export const viewRooms = async (req, res, next) => {
  try {
    const { hotelId } = req.query;
    let roomsData = await getDataFromRedis(ROOMS_DATA);
    if (!roomsData) {
      roomsData = await getAllData(HOTEL_ROOMS, { hotelId });
      setDataInRedis(ROOMS_DATA, roomsData);
    }
    successResponse(res, ROOMS_FETCHED_SUCCESSFULLY, roomsData);
  } catch (err) {
    next(err);
  }
};

export const createRoom = async (req, res, next) => {
  try {
    const { hotelId, roomNo, floor, roomPrice } = req.body;

    const isRoomExists = await isDuplicateRoom(hotelId, roomNo, floor);
    if (isRoomExists) return errorResponse(res, UNPROCESSABLE_ENTITY, ROOM_ALREADY_EXISTS);

    const createRoomData = { hotelId, roomNo, floor, roomPrice };
    const createRoom = await insertSingleEntity(HOTEL_ROOMS, createRoomData);
    await updateRoomsDataInRedis(hotelId);
    successResponse(res, ROOM_ADDED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const { id, roomPrice, isBooked } = req.body;
    const updateRoomData = {
      ...(roomPrice && { roomPrice }),
      ...(isBooked && { isBooked })
    };
    const updateDataResult = await updateData(HOTEL_ROOMS, updateRoomData, { id });
    const roomDetails = await getSingleRecord(HOTEL_ROOMS, { id });
    await updateRoomsDataInRedis(roomDetails.hotelId);
    successResponse(res, ROOM_UPDATED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteRoom = await deleteData(HOTEL_ROOMS, { id });
    await updateRoomsDataInRedis(hotelId);
    successResponse(res, ROOM_DELETED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

const isDuplicateRoom = async (hotelId, roomNo, floor) => {
  const roomData = await getAllData(HOTEL_ROOMS, { hotelId, roomNo, floor });
  return roomData.length ? true : false;
};

const updateRoomsDataInRedis = async (hotelId) => {
  const [roomsData, _deletedRedisData] = await Promise.all([
    getAllData(HOTEL_ROOMS, { hotelId }),
    deleteDataFromRedis(ROOMS_DATA)
  ]);
  setDataInRedis(ROOMS_DATA, roomsData);
};
