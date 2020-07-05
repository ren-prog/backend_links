const express  = require('express');

const router = express.router();

router.get('/sing-in', (res, req)=> {
    return res.json('sing-in');
});

router.get('/sing-up', (res, req)=> {
    return res.json('sing-up');
});

module.exports = router;