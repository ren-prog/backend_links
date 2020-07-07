
const Joi = require('@hapi/joi');
const { getValidatorError } = require('../helpers/validator');

const rules = {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
}

const accountSingIn = (req, res, next)=> {
    const { email, password, password_confirmation } = req.body;

    //console.log('** Acount sing-up', email, password );

    const schema = Joi.object({
        email: rules.email,
        password: rules.password,
    });

    const { error }  = schema.validate( { email, password }, { abortEarly:false})
    
    if(error){
        const messagesError = getValidatorError(error, 'account.signup');
        return res.jsonBadRequest(null, null, { error: messagesError });
    }
    
    next();
};

const accountSingUp = (req, res, next)=> {

    const { email, password, password_confirmation } = req.body;

    //console.log('** Acount sing-up', email, password );

    const schema = Joi.object({
        email: rules.email,
        password: rules.password,
        password_confirmation: rules.password_confirmation,
    });

    const { error }  = schema.validate( { email, password, password_confirmation }, { abortEarly:false})
    
    if(error){
        const messagesError = getValidatorError(error, 'account.signup');
        return res.jsonBadRequest(null, null, { error: messagesError });
    }
    
    next();
};

module.exports = { accountSingUp, accountSingIn};