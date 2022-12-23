import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(3).max(25).required(),
    confirmPassword: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),    
}) 