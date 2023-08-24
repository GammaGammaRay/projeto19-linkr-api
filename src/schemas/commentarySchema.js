import Joi from "joi";

export const commentarySchema = Joi.object({
  postId: Joi.number().integer().positive().required(),
  message: Joi.string().required(),
});