const express  = require('express');
const { Account } = require('../models')
const bcrypt = require('bcrypt');

const router = express.Router();

const saltRound = 10;

router.get('/sing-in', (req, res)=> {
    return res.json('sing-in');
});

router.get('/sing-up', async (req, res)=> {

    const email = 'renan@gmail.com'; 
    const password =  '123456';

    const hash = bcrypt.hashSync(password, saltRound)

    const result = await Account.create( { email, password: hash} );
    
    console.log(result)
    return res.json(result);
});

module.exports = router;