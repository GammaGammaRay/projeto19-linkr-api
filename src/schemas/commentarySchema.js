import Joi from "joi";

export const commentarySchema = Joi.object({
  postId: Joi.number().integer().positive().required(),
  description: Joi.string().required(),
});