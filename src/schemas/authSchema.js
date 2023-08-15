import Joi from 'joi';

export const signin = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required()
}).required();

export const sigup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cpf: Joi.string().length(11).pattern(/^\d+$/).required(),
    phoneNumber: Joi.string().length(11).pattern(/^\d+$/).required(),
}).required();