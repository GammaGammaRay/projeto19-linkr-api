import Joi from "joi";

export const postSchema = Joi.object({
  author: Joi.number().required(),
  link: Joi.string().uri().required(),
  description: Joi.string().allow("").optional(),
});

