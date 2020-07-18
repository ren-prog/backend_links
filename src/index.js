const express = require('express');
const db = require('./models')
const response = require('./middlewares/response');
const authController = require('./controllers/auth');
const linkController = require('./controllers/link');
const checkJwt = require('./middlewares/jwt');

const app = express();

app.use(response);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(checkJwt)

// /auth/sing-in
// /auth/sing-up

app.use('/auth', authController );
app.use('/link', linkController );


app.get('/', (req, res)=> {
    return res.json('Api runing');
})

db.sequelize.sync().then(()=> {
    app.listen(3333, () => {
        console.log('Listening on port 3333')
    });
});
