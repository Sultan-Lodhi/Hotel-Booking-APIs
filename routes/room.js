import express from 'express';
import { viewRooms, createRoom, updateRoom, deleteRoom } from '../controllers/index.js';
import { roomSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { viewRoomsSchema, createRoomSchema, updateRoomSchema, deleteRoomSchema } = roomSchemas;
const { QUERY, BODY, PARAMS } = REQUEST_PROPERTY;

/**
 * @openapi
 * '/hotel/bookings/api/room':
 *  get:
 *     tags:
 *     - Room APIs
 *     summary: Get Hotel Rooms
 *     parameters:
 *      - name: hotelId
 *        in: query
 *        description: Hotel Id
 *        required: true
 *     responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
router.get('/room', JoiValidator(viewRoomsSchema, QUERY), viewRooms);

/**
 * @openapi
 * '/hotel/bookings/api/room':
 *  post:
 *     tags:
 *     - Room APIs
 *     summary: Add New Room
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - hotelId
 *              - roomNo
 *              - floor
 *              - roomPrice
 *            properties:
 *              hotelId:
 *                type: integer
 *                default: 54
 *              roomNo:
 *                type: integer
 *                default: 301
 *              floor:
 *                type: integer
 *                default: 5
 *              roomPrice:
 *                type: integer
 *                default: 1250
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Internal Server Error
 */
router.post('/room', JoiValidator(createRoomSchema, BODY), createRoom);

/**
 * @openapi
 * '/hotel/bookings/api/room':
 *  put:
 *     tags:
 *     - Room APIs
 *     summary: Update Room
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
 *                default: 12
 *              roomPrice:
 *                type: integer
 *                default: 1250
 *              isBooked:
 *                type: integer
 *                default: 1
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Internal Server Error
 */
router.put('/room', JoiValidator(updateRoomSchema, BODY), updateRoom);

/**
 * @openapi
 * '/hotel/bookings/api/room/{id}':
 *  delete:
 *     tags:
 *     - Room APIs
 *     summary: Delete Room
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Room id
 *        required: true
 *     responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
router.delete('/room/:id', JoiValidator(deleteRoomSchema, PARAMS), deleteRoom);

export const roomRouter = router;
