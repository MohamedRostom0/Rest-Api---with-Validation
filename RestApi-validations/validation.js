//VALIDATION functions using @hapi/joi

const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation
}