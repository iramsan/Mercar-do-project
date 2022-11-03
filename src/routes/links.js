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
    const userUpData = { Name, Price, Description, Img, fk_category};
    await pool.query('INSERT INTO article SET ?', [userUpData]);
    res.send('Up');
});

route.get('/register/login', (req, res) => {
    const value = 'login';
    res.render('register', {value});
});




route.get('/register/create-acount', (req, res) => {
    const value = 'createAcount';
    res.render('register', {value});
});

route.post('/register/create-acount', async (req, res) => {
    const { Username, Name, LastName, Email, Password } = req.body;
    const values_user = { Username, Name, LastName, Email, Password };
    await pool.query('INSERT INTO users SET ?', [values_user]);
    res.send('up');
});

module.exports = route;