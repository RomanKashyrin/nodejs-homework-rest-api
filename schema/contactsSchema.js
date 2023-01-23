const Joi = require('joi');

const schemaAddContact = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(5).required(),
});

const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(5),
});

module.exports = {
    schemaAddContact,
    schemaUpdateContact,
}
