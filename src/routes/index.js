const express = require('express');
const pool = require('../database');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('home');
});

route.get('/sell', (req, res) => {
    if (req.session.user) {
        res.render('sell');
    } else {
        req.flash('message_error', 'Necesitas Iniciar Sesión');
        res.redirect('/register/login');
    }
});

route.get('/register/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    }
    const value = 'login';
    res.render('register', {value});
});

route.get('/register/create-acount', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        const value = 'createAcount';
        res.render('register', {value});
    }
});

route.get('/profile', (req, res) => {
    if (req.session.user) {
        res.render('profile');
    } else {
        req.flash('message_error', 'Necesitas Iniciar Sesión');
        res.redirect('/register/login');
    }
});

route.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/register/login');
});


module.exports = route;
