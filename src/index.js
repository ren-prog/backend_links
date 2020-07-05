const express = require('express');
const db = require('./models')
const response = require('./middlewares/response');
const authController = require('./controllers/auth');

const app = express();

app.use(response);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// /auth/sing-in
// /auth/sing-up

app.use('/auth', authController );


app.get('/', (req, res)=> {
    return res.json('Api runing');
})

db.sequelize.sync().then(()=> {
    app.listen(3333, () => {
        console.log('Listening on port 3333')
    });
});
