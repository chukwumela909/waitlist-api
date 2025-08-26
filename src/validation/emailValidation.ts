// src/validations/userValidation.ts
import Joi from 'joi';

export const emailValidation = Joi.object({
  email: Joi.string().email().required()
});