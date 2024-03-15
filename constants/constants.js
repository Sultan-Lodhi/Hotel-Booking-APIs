export const BASE_URL = '/hotel/bookings/api';

export const MESSAGES = {
  PASSWORDS_MISMATCH: 'Passwords do not match',
  USER_ALREADY_EXIST: 'User already exists',
  USER_REGISTRATION_SUCCESSFUL: 'User Registration Successful',
  USER_LOGIN_SUCCESSFUL: 'User login successful',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ACCESS_DENIED: 'Access Denied',
  SESSION_EXPIRED: 'This session has expired. Please login',
  HOTEL_ADDED_SUCCESSFULLY: 'Hotel Added Successfully',
  HOTEL_DELETED_SUCCESSFULLY: 'Hotel Deleted Successfully',
  HOTEL_UPDATED_SUCCESSFULLY: 'Hotel Updated Successfully',
  HOTELS_FETCHED_SUCCESSFULLY: 'Hotels data fetched successfully',
  INSERTION_FAILED: 'Insertion Failed',
  BULK_INSERTION_FAILED: 'Bulk Insertion Failed',
  UPDATE_FAILED: 'Update Failed',
  DELETION_FAILED: 'Deletion Failed',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  USER_BOOKINGS_FETCHED_SUCCESSFULLY: 'User bookings fetched successfully',
  HOTEL_BOOKED_SUCCESSFULLY: 'Hotel booked successfully',
  BOOKING_CANCELLED_SUCCESSFULLY: 'Booking cancelled successfully',
  ROOMS_FETCHED_SUCCESSFULLY: 'Rooms fetched successfully',
  ROOM_ADDED_SUCCESSFULLY: 'Room added successfully',
  ROOM_UPDATED_SUCCESSFULLY: 'Room updated successfully',
  ROOM_DELETED_SUCCESSFULLY: 'Room deleted successfully',
  ROOM_ALREADY_EXISTS: 'Room already exists'
};

export const MODELS = {
  USERS: 'users',
  HOTELS: 'hotels',
  HOTEL_ROOMS: 'hotelRooms',
  USER_BOOKINGS: 'userBookings'
};

export const GET = 'GET';

export const HOTEL = 'hotel';

export const REQUEST_PROPERTY = {
  QUERY: 'query',
  BODY: 'body',
  PARAMS: 'params'
};

export const TOKEN_EXPIRY_TIME = '1h';

export const REDIS_KEYS = {
  HOTELS_DATA: 'hotels_data',
  ROOMS_DATA: 'rooms_data'
};
