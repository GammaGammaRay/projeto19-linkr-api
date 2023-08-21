import Joi from "joi";

export const postSchema = Joi.object({
  author: Joi.number().required(),
  link: Joi.string().required(),
  description: Joi.string().allow("").optional(),
});

