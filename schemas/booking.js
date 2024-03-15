import Joi from 'joi';

export const bookingSchemas = {
  viewBookingsSchema: Joi.object().keys({
    userId: Joi.number().required()
  }),
  makeBookingSchema: Joi.object().keys({
    userId: Joi.number().required(),
    hotelId: Joi.number().required(),
    roomId: Joi.number().required()
  }),
  cancelBookingSchema: Joi.object().keys({
    id: Joi.number().required()
  })
};
