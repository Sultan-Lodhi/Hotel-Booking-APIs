import Joi from 'joi';

export const hotelSchemas = {
  getHotelsSchema: Joi.object().keys({
    hotelName: Joi.string().optional()
  }),
  getHotelsSchemaV2: Joi.object().keys({
    hotelName: Joi.string().optional(),
    city: Joi.string().optional()
  }),
  createHotelSchema: Joi.object().keys({
    hotelName: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    rating: Joi.number().required().min(1).max(7)
  }),
  updateHotelSchema: Joi.object().keys({
    id: Joi.number().required(),
    hotelName: Joi.string().optional(),
    city: Joi.string().optional(),
    address: Joi.string().optional(),
    rating: Joi.number().optional().min(1).max(7)
  }),
  deleteHotelSchema: Joi.object().keys({
    id: Joi.number().required()
  }),
  addHotelEmployeeSchema: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    role: Joi.number().required(),
    hotelId: Joi.number().required()
  })
};
