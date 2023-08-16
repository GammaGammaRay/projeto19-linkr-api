import Joi from 'joi';

export const signinSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required()
}).required();

export const signupSchema = Joi.object({
    username: Joi.string().required(),
    profileUrl: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).required();