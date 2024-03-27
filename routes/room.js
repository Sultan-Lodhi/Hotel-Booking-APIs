import express from 'express';
import { viewRooms, createRoom, updateRoom, deleteRoom } from '../controllers/index.js';
import { roomSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { viewRoomsSchema, createRoomSchema, updateRoomSchema, deleteRoomSchema } = roomSchemas;
const { QUERY, BODY, PARAMS } = REQUEST_PROPERTY;

router.get('/room', JoiValidator(viewRoomsSchema, QUERY), viewRooms);
router.post('/room', JoiValidator(createRoomSchema, BODY), createRoom);
router.put('/room', JoiValidator(updateRoomSchema, BODY), updateRoom);
router.delete('/room/:id', JoiValidator(deleteRoomSchema, PARAMS), deleteRoom);

export const roomRouter = router;
