const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
const options = { expiresIn: '30 minutes'};
const refreshOptions = { expiresIn: '30 days'};

const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, options);
}

const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
}

const verifyToken = (token) => {
    return jwt.verify(token,tokenPrivateKey)
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey)
}

const getTokenFromHeaders = (headers) => {

    const token = req.headers['authorization'];
    return token = token ? token.slice(7, token.lenght) : null;

    //if(!token) res.jsonUnauthorized(null, 'Invalid Token');

}


module.exports = { generateJwt,  verifyToken, generateRefreshJwt, verifyRefreshToken, getTokenFromHeaders};