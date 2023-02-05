import Joi from "joi";

export const loginScheam = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().min(6).required(),
});
