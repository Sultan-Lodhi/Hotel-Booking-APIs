import Joi from 'joi';

export const roomSchemas = {
  viewRoomsSchema: Joi.object().keys({
    hotelId: Joi.number().required()
  }),
  createRoomSchema: Joi.object().keys({
    hotelId: Joi.number().required(),
    roomNo: Joi.number().required(),
    floor: Joi.number().required(),
    roomPrice: Joi.number().required()
  }),
  updateRoomSchema: Joi.object().keys({
    id: Joi.number().required(),
    roomPrice: Joi.number().optional(),
    isBooked: Joi.number().optional()
  }),
  deleteRoomSchema: Joi.object().keys({
    id: Joi.number().required()
  })
};
