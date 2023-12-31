import Joi from "joi";

export const email = Joi.string().email(new RegExp("gmail.com$")).required();
export const Passwords = Joi.string().min(6).required();
