const { verifyJwt } = require('../helpers/jwt');

const checkJwt = (req, res, next ) => {

    let token = req.headers['authorization'];
    token = token ? token.slice(7, token.lenght) : null;

    if(!token) res.jsonUnauthorize(null, 'Invalid Token');

    try {
        
        const decoded = verifyJwt(token);

        console.log('Token', token);
        console.log('decoded', decoded);
        console.log('decoded', new Date (decoded.exp * 1000));

        req.accountId = decoded.id;
        next();
        
    } catch (error) {
        res.jsonUnauthorize(null, 'Invalid Token');
    }
    

};

module.exports = checkJwt;