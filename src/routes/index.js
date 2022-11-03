const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('home');
});

route.get('/store', (req, res) => {
    res.render('store');
});

route.get('/sell', (req, res) => {
    res.render('sell');
});


module.exports = route;
