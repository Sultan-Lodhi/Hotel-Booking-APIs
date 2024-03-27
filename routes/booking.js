import express from 'express';
import { viewBookings, makeBooking, cancelBooking, viewBookingsByEmployee } from '../controllers/index.js';
import { bookingSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { viewBookingsSchema, makeBookingSchema, cancelBookingSchema } = bookingSchemas;
const { QUERY, BODY, PARAMS } = REQUEST_PROPERTY;

router.get('/booking', JoiValidator(viewBookingsSchema, QUERY), viewBookings);
router.get('/booking/employee', viewBookingsByEmployee);
router.post('/booking', JoiValidator(makeBookingSchema, BODY), makeBooking);
router.delete('/booking/:id', JoiValidator(cancelBookingSchema, PARAMS), cancelBooking);

export const bookingRouter = router;
