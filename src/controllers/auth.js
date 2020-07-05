const express  = require('express');
const { Account } = require('../models');
const bcrypt = require('bcrypt');
const { accountSingUp } = require('../validators/account');
const { getMessages } = require('../helpers/validator');

const router = express.Router();

const saltRound = 10;

router.get('/sing-in', (req, res)=> {
    return res.json('sing-in');
});

router.post('/sing-up', accountSingUp,  async (req, res)=> {

    const { email, password } = req.body;

    const account =  await Account.findOne( { where: {email} });

    if (account) return res.json(getMessages('Account.signup.email_exists'));

    /* const email = 'renan@gmail.com'; 
    const password =  '123456'; */

    const hash = bcrypt.hashSync(password, saltRound)

    const newAccount = await Account.create( { email, password: hash} );
    
    //console.log( { email, password })
    return res.jsonOK(newAccount, getMessages('Account.signup.sucesse'));
});

module.exports = router;