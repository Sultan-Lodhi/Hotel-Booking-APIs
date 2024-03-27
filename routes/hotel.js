import express from 'express';
import {
  getHotelsData,
  getHotelsDataV2,
  addNewHotel,
  updateHotelData,
  deleteHotelData,
  addHotelEmployee
} from '../controllers/index.js';
import { hotelSchemas } from '../schemas/index.js';
import { JoiValidator, CheckApiVersion } from '../middlewares/index.js';
import { REQUEST_PROPERTY, API_VERSIONS } from '../constants/index.js';

const router = express.Router();

const {
  getHotelsSchema,
  getHotelsSchemaV2,
  createHotelSchema,
  updateHotelSchema,
  deleteHotelSchema,
  addHotelEmployeeSchema
} = hotelSchemas;
const { BODY, PARAMS, QUERY } = REQUEST_PROPERTY;
const { VERSION_1, VERSION_2 } = API_VERSIONS;

router.get('/hotel', CheckApiVersion(VERSION_1), JoiValidator(getHotelsSchema, QUERY), getHotelsData);
router.get('/hotel', CheckApiVersion(VERSION_2), JoiValidator(getHotelsSchemaV2, QUERY), getHotelsDataV2);
router.post('/hotel', JoiValidator(createHotelSchema, BODY), addNewHotel);
router.post('/hotel/employee', JoiValidator(addHotelEmployeeSchema, BODY), addHotelEmployee);
router.put('/hotel', JoiValidator(updateHotelSchema, BODY), updateHotelData);
router.delete('/hotel/:id', JoiValidator(deleteHotelSchema, PARAMS), deleteHotelData);

export const hotelRouter = router;
