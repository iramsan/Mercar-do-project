const express = require('express');
const route = express.Router();
const pool = require('../database');

//Routes 
route.get('/store', async (req, res) => {
    const article = await pool.query('SELECT * FROM article');
    res.render('store', { article });
});

route.get('/store/article/:id', async (req, res) => {
    const { id } = req.params;
    const art = await pool.query('SELECT * FROM article WHERE ID_article = ?', [id]);
    res.render('./partials/article', { art: art[0] });
});

route.post('/sell', async (req, res) => {
    const { originalname } = req.file;
    const {Name, Price, Description, fk_category} = req.body;
    const Img = originalname;
    const userUpData = {Name, Price, Description, Img, fk_category};
    await pool.query('INSERT INTO article SET ?', [userUpData]);
    res.render('sell');
});

route.post('/register/create-acount', async (req, res) => {
    const { Username, Name, LastName, Email, Password } = req.body;
    const values_user = { Username, Name, LastName, Email, Password };
    await pool.query('INSERT INTO users SET ?', [values_user]);
    res.send('up');
});

// Session
route.post('/register/login', async (req, res) => {
    const {Email, Password} = req.body;
    const email = {Email};
    const pass = {Password};
    const query = await pool.query('SELECT * FROM users WHERE ?', [email]);
    if (query.length !== 0) {
        if (pass.Password == query[0]['Password']) {
            req.flash('message_success', 'Bienvenido');
            req.session.user = query[0];
            res.redirect('/profile');
        } else {
            req.flash('message_error', 'Contraseña incorrecta');
            res.redirect('/register/login');
        }
    } else {
        req.flash('message_error', 'El usuario no existe');
        res.redirect('/register/login');
    }
});

module.exports = route;