
const { getMessages } = require('../helpers/messages');

const getValidatorError = (error, messagePath) => {

    if(!error) return null;

    const errorMessages = {};

    error.details.map((details)=> {
        const message = details.message;
        const type = details.type;
        const key = details.context.key;
        const path = `${messagePath}.${key}.${type}`;

        console.log('error message path', path);

        const cutomMessage = getMessages(path);
        if(!cutomMessage){
            console.log('customMessage not found', path)
        }
        errorMessages[key] = getMessages(path) || message;
    });
    return errorMessages;
}

module.exports = { getValidatorError, getMessages };