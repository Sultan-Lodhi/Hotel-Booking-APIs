import { successResponse } from '../helpers/index.js';
import { MESSAGES, MODELS } from '../constants/index.js';
import {
  getUserBookingsDetails,
  deleteData,
  insertSingleEntity,
  updateData,
  getEmployeeHotelData,
  getHotelBookingsData
} from '../services/index.js';

const { USER_BOOKINGS, HOTEL_ROOMS } = MODELS;
const { USER_BOOKINGS_FETCHED_SUCCESSFULLY, HOTEL_BOOKED_SUCCESSFULLY, BOOKING_CANCELLED_SUCCESSFULLY } = MESSAGES;

export const viewBookings = async (req, res, next) => {
  try {
    const { userId } = req.query;
    let userBookings = await getUserBookingsDetails(userId);
    userBookings = userBookings.map((booking) => {
      const {
        id,
        noOfGuests,
        checkIn,
        checkOut,
        hotel: { hotelName, city, address, rating },
        hotelRoom: { roomNo, floor, roomPrice }
      } = booking;
      return { id, hotelName, address, city, rating, roomNo, floor, roomPrice, noOfGuests, checkIn, checkOut };
    });
    successResponse(res, USER_BOOKINGS_FETCHED_SUCCESSFULLY, userBookings);
  } catch (err) {
    next(err);
  }
};

export const viewBookingsByEmployee = async (req, res, next) => {
  try {
    const employeeId = req.user.id;
    const employeeHotelData = await getEmployeeHotelData(employeeId);
    let hotelBookings = employeeHotelData ? await getHotelBookingsData(employeeHotelData.hotelId) : [];
    hotelBookings = hotelBookings.map((booking) => {
      const {
        id,
        noOfGuests,
        checkIn,
        checkOut,
        user: { userName, email, mobile },
        hotel: { hotelName, city, address, rating },
        hotelRoom: { roomNo, floor, roomPrice }
      } = booking;
      return {
        id,
        userName,
        email,
        mobile,
        hotelName,
        address,
        city,
        rating,
        roomNo,
        floor,
        roomPrice,
        noOfGuests,
        checkIn,
        checkOut
      };
    });
    successResponse(res, USER_BOOKINGS_FETCHED_SUCCESSFULLY, hotelBookings);
  } catch (err) {
    next(err);
  }
};

export const makeBooking = async (req, res, next) => {
  try {
    const { userId, hotelId, roomId, noOfGuests, checkIn, checkOut } = req.body;
    const makeBookingData = { userId, hotelId, roomId, noOfGuests, checkIn, checkOut };
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
