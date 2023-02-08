import Joi from "joi";

export const deliverySchema = Joi.object({
  city: Joi.string().min(2).max(60).required(),
  address: Joi.string().min(5).max(255).required(),
  name: Joi.string().min(5).max(255).required(),
  phone: Joi.string().min(10).max(10).required(),
});

export const createOrderSchema = Joi.object({
  items: Joi.array()
    .items({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    })
    .min(1),
  delivery: deliverySchema,
});

export const canBeModified = (date) => {
  const compareResult =
    new Date(new Date().setHours(new Date().getHours() + 5)) > date;
  return compareResult != 1;
};