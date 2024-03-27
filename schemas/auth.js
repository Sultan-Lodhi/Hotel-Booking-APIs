import Joi from 'joi';

export const authSchemas = {
  userRegisterationSchema: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    role: Joi.number().required()
  }),
  userLoginSchema: Joi.object().keys({
    userEmailMobile: Joi.string().required(),
    password: Joi.string().required()
  })
};
