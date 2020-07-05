const express = require('express');

const app = express();

app.get('/', (req, res)=> {
    return res.json('Api runing');
})

app.listen(3333, () => {
    console.log('Listening on port 3333')
});