import Joi from 'joi';

export const signin = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required()
}).required();

export const signup = Joi.object({
    username: Joi.string().required(),
    profileUrl: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).required();