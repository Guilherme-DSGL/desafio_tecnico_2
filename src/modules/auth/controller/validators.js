const validator = require('jsonschema');
const statusCode = require('../../../common/constants/statusCode');
 
const validateSignUpRequest = (body) => {
    return validator.validate(body, {
        type: 'object',
        properties: { 
            nome: {
                type: 'string',
                minLength: 5,
                maxLength: 30,
                pattern: '^[^\\s].*[^\\s]$'
            },
            email: {
                type: 'string',
                format: 'email',
                minLength: 5,
                maxLength: 60,
            },
            senha: {
                type: 'string',
                minLength: 5,
                maxLength: 20,
                pattern: '^[^\\s]+$'
            },
            telefones: {
                type:'array',
                minItems: 1,
                maxItems: 5,
                items: {
                    type: 'object',
                    properties: {
                        numero: {
                            type : 'string',
                            minLength: 9,
                            maxLength: 9
                        },
                        ddd: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 2,
                        },
                    },
                    required: ['numero', 'ddd'],
                },
            }, 
        },
        required: ['nome', 'email', 'senha', 'telefones'],
    },
    );
};


const validateSignInRequest = (body) => {
    return validator.validate(body, {
        type: 'object',
        properties: { 
            email: {
                type: 'string',
                format: 'email',
                minLength: 5,
                maxLength: 30,
            },
            senha: {
                type: 'string',
                minLength: 5,
                maxLength: 20,
                pattern: '^[^\\s]+$'
            },
        },
        required: ['email', 'senha'],
    },
    );
};

const validateSignUpBody = (req, res, next) => {
    const validationRes = validateSignUpRequest(req.body);
    if (!validationRes.valid) {
        return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
            mensagem: `${validationRes.errors[0].message} -property ${validationRes.errors[0].property.replace('instance.', '')}`, 
        });
    }
    next();
};

const validateSignInBody = (req, res, next) => {
    const validationRes = validateSignInRequest(req.body);
    if (!validationRes.valid) {
        return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
            mensagem: `${validationRes.errors[0].message} -property ${validationRes.errors[0].property.replace('instance.', '')}`, 
        });
    }
    next();
};

module.exports = {
    validateSignUpBody,
    validateSignInBody
};