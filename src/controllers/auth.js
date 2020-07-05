const express  = require('express');
const { Account } = require('../models')
const bcrypt = require('bcrypt');

const router = express.Router();

const saltRound = 10;

router.get('/sing-in', (req, res)=> {
    return res.json('sing-in');
});

router.post('/sing-up', async (req, res)=> {

    const { email, password } = req.body;

    const account =  await Account.findOne( { where: {email} });

    if (account) return res.json('Account already exists');

    /* const email = 'renan@gmail.com'; 
    const password =  '123456'; */

    const hash = bcrypt.hashSync(password, saltRound)

    const newAccount = await Account.create( { email, password: hash} );
    
    //console.log( { email, password })
    return res.jsonOK(newAccount, 'Teste Conta json ok');
});

module.exports = router;