import express from 'express';
import { getHotelsData, addNewHotel, updateHotelData, deleteHotelData } from '../controllers/index.js';
import { hotelSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { getHotelsSchema, createHotelSchema, updateHotelSchema, deleteHotelSchema } = hotelSchemas;
const { BODY, PARAMS, QUERY } = REQUEST_PROPERTY;

/**
 * @openapi
 * '/hotel/bookings/api/hotel':
 *  get:
 *     tags:
 *     - Hotel APIs
 *     summary: Get Hotels Data
 *     parameters:
 *      - name: hotelName
 *        in: query
 *        description: Hotel Name
 *     responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
router.get('/hotel', JoiValidator(getHotelsSchema, QUERY), getHotelsData);

/**
 * @openapi
 * '/hotel/bookings/api/hotel':
 *  post:
 *     tags:
 *     - Hotel APIs
 *     summary: Add new hotel
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - hotelName
 *              - city
 *              - address
 *              - rating
 *            properties:
 *              hotelName:
 *                type: string
 *                default: Hyatt Regency
 *              city:
 *                type: string
 *                default: Delhi
 *              address:
 *                type: string
 *                default: Flat 121, Hauz Khas
 *              rating:
 *                type: integer
 *                default: 5
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Internal Server Error
 */
router.post('/hotel', JoiValidator(createHotelSchema, BODY), addNewHotel);

/**
 * @openapi
 * '/hotel/bookings/api/hotel':
 *  put:
 *     tags:
 *     - Hotel APIs
 *     summary: Update hotel
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: integer
 *                default: 13
 *              hotelName:
 *                type: string
 *                default: Hyatt Regency
 *              city:
 *                type: string
 *                default: Delhi
 *              address:
 *                type: string
 *                default: Flat 121, Hauz Khas
 *              rating:
 *                type: integer
 *                default: 5
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Internal Server Error
 */
router.put('/hotel', JoiValidator(updateHotelSchema, BODY), updateHotelData);

/**
 * @openapi
 * '/hotel/bookings/api/hotel/{id}':
 *  delete:
 *     tags:
 *     - Hotel APIs
 *     summary: Delete Hotel
 *     parameters:
 *      - name: id
 *        in: path
 *        description: hotel id
 *        required: true
 *     responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
router.delete('/hotel/:id', JoiValidator(deleteHotelSchema, PARAMS), deleteHotelData);

export const hotelRouter = router;
