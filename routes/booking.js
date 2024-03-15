import express from 'express';
import { viewBookings, makeBooking, cancelBooking } from '../controllers/index.js';
import { bookingSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { viewBookingsSchema, makeBookingSchema, cancelBookingSchema } = bookingSchemas;
const { QUERY, BODY, PARAMS } = REQUEST_PROPERTY;

/**
 * @openapi
 * '/hotel/bookings/api/booking':
 *  get:
 *     tags:
 *     - Bookings APIs
 *     summary: Get User Bookings
 *     parameters:
 *      - name: userId
 *        in: query
 *        description: The userId of the user
 *        required: true
 *     responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
router.get('/booking', JoiValidator(viewBookingsSchema, QUERY), viewBookings);

/**
 * @openapi
 * '/hotel/bookings/api/booking':
 *  post:
 *     tags:
 *     - Bookings APIs
 *     summary: Make Booking
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - userId
 *              - hotelId
 *              - roomId
 *            properties:
 *              userId:
 *                type: string
 *                default: 34
 *              hotelId:
 *                type: string
 *                default: 12
 *              roomId:
 *                type: string
 *                default: 31
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Internal Server Error
 */
router.post('/booking', JoiValidator(makeBookingSchema, BODY), makeBooking);

/**
 * @openapi
 * '/hotel/bookings/api/booking/{id}':
 *  delete:
 *     tags:
 *     - Bookings APIs
 *     summary: Cancel Bookings
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user booking id
 *        required: true
 *     responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
router.delete('/booking/:id', JoiValidator(cancelBookingSchema, PARAMS), cancelBooking);

export const bookingRouter = router;
