const messages = require('../config/messages.json');


getMessages = (path)=> {
    return messages[path] || null;
};


module.exports = { getMessages };