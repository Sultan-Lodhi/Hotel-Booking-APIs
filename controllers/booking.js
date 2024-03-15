import { successResponse } from '../helpers/index.js';
import { MESSAGES, MODELS } from '../constants/index.js';
import { getUserBookingsDetails, deleteData, insertSingleEntity, updateData } from '../services/index.js';

const { USER_BOOKINGS, HOTEL_ROOMS } = MODELS;
const { USER_BOOKINGS_FETCHED_SUCCESSFULLY, HOTEL_BOOKED_SUCCESSFULLY, BOOKING_CANCELLED_SUCCESSFULLY } = MESSAGES;

export const viewBookings = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const userBookings = await getUserBookingsDetails(userId);
    successResponse(res, USER_BOOKINGS_FETCHED_SUCCESSFULLY, userBookings);
  } catch (err) {
    next(err);
  }
};

export const makeBooking = async (req, res, next) => {
  try {
    const { userId, hotelId, roomId } = req.body;
    const makeBookingData = { userId, hotelId, roomId };
    const [makeBooking, updateRoomStatus] = await Promise.all([
      insertSingleEntity(USER_BOOKINGS, makeBookingData),
      updateData(HOTEL_ROOMS, { isBooked: 1 }, { id: roomId })
    ]);

    successResponse(res, HOTEL_BOOKED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cancelBooking = await deleteData(USER_BOOKINGS, { id });
    successResponse(res, BOOKING_CANCELLED_SUCCESSFULLY);
  } catch (err) {
    next(err);
  }
};
