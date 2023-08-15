import Joi from "joi";

export const signupSchema = Joi.object(
    {
        name: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
        cpf: Joi.string().trim().length(11).pattern(/^\d+$/).required(),
        phoneNumber:  Joi.string().trim().length(11).pattern(/^\d+$/).required()
    }
);

export const signinSchema = Joi.object(
    {
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required()
    }
)