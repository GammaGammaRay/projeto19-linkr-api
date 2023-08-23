import Joi from "joi";

export const commentarySchema = Joi.object({
  author: Joi.number().integer().positive().required(),
  postId: Joi.number().integer().positive().required(),
  description: Joi.string().required(),
});