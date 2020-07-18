const express  = require('express');
const { Account } = require('../models');
const bcrypt = require('bcrypt');
const { accountSingUp, accountSingIn } = require('../validators/account');
const { getMessages } = require('../helpers/validator');

const { generateJwt, generateRefreshJwt} = require('../helpers/jwt');

const router = express.Router();

const saltRound = 10;

// Login
router.post('/sing-in', accountSingIn, async (req, res)=> {

    const { email, password } = req.body;

    const account = await Account.findOne({where: { email } });

    const match = account ? bcrypt.compareSync(password, account.password ) : null;
    if(!match) return res.jsonBadRequest(null, getMessages('account.singin.invalid'));

    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({ id: account.id, version: Account.jwtVersion });

    return res.json(account, null, { token, refreshToken } );
});

// Cadastro
router.post('/sing-up', accountSingUp,  async (req, res)=> {

    const { email, password } = req.body;

    const account =  await Account.findOne( { where: {email} });

    if (account) return res.json(getMessages('Account.signup.email_exists'));

    /* const email = 'renan@gmail.com'; 
    const password =  '123456'; */

    const hash = bcrypt.hashSync(password, saltRound)

    const newAccount = await Account.create( { email, password: hash} );
    
    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});



    //console.log( { email, password })
    return res.jsonOK(newAccount, getMessages('Account.signup.sucesse'), { token, refreshToken});
});

module.exports = router;