import Joi from 'joi';

export const hotelSchemas = {
  getHotelsSchema: Joi.object().keys({
    hotelName: Joi.string().optional()
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
  })
};
