const { query, json } = require('express');
const express = require('express');
const route = express.Router();
const pool = require('../database');

//Routes 
route.get('/store', async (req, res) => {
    const article = await pool.query('SELECT ID_article, a.Name as "NameArt" , u.Name as "NameUser", Price, Description, Img, View, Discount, fk_category FROM article as a JOIN users as u ON fk_user = ID_user ORDER BY ID_article DESC');
    res.render('store', { article });
});

route.get('/store/article/:id', async (req, res) => {
    const { id } = req.params;
    const art = await pool.query('SELECT * FROM article WHERE ID_article = ?', [id]);
    const all_data = await pool.query('SELECT ID_article, ID_user, a.Name as "NameArt" , u.Name as "NameUser", Price, Description, Img, View, Discount, fk_category FROM article as a JOIN users as u ON fk_user = ID_user WHERE ID_article = ?', [id]);
    res.render('./partials/article', { art: art[0], all_data: all_data[0] });
});

route.post('/store/article/:id', (req, res) => {
    const { id } = req.params;
    console.log('agregado');
    req.flash('message_success', '1 Articulo añadido a la compra');
    res.redirect(`/store/article/${id}`);
});

route.post('/sell', async (req, res) => {
    const {Name, Price, Description, Discount, fk_category} = req.body;
    const { originalname } = req.file ? req.file : 0;
    const Img = originalname;

    const user_id = req.session.user.ID_user;

    if (Name.length !== 0 && Price.length !== 0 && Description.length !== 0) {
        if (Img !== undefined) {
            if (Discount >= 1) {
                // With Discount
                const userUpData = {Name, Price, Description, Img, Discount, fk_category, fk_user: user_id};
                await pool.query('INSERT INTO article SET ?', [userUpData]);
                req.flash('message_success', 'Articulo publicado con exito');
                res.redirect('/profile');
            } else {
                // Without Discount
                const userUpData = {Name, Price, Description, Img, fk_category, fk_user: user_id};
                await pool.query('INSERT INTO article SET ?', [userUpData]);
                req.flash('message_success', 'Articulo publicado con exito');
                res.redirect('/profile');
            }
            
        } else {
            req.flash('message_error', 'Es necesario cargar una imagen');
            res.redirect('/sell');
        }
    } else {
        req.flash('message_error', 'Rellene todos los campos');
        res.redirect('/sell');
    }
});

route.post('/register/create-acount', async (req, res) => {
    const { Username, Name, LastName, Email, Password, Confirm } = req.body;

    // Validate
    if (Username.length !== 0 && Name.length !== 0 && Email.length !== 0 ) {
        if (Password.length >= 8) {
            if (Password === Confirm){
                const values_user = { Username, Name, LastName, Email, Password };
                await pool.query('INSERT INTO users SET ?', [values_user]);
                req.flash('message_success', 'Cuenta creada con exito');
                res.redirect('/register/login');
            } else {
                req.flash('message_error', 'La contraseña no coincide');
                res.redirect('/register/create-acount');
            }
        } else {
            req.flash('message_error', 'La contraseña debe por lo menos tener 8 caracteres');
            res.redirect('/register/create-acount');
        }
    } else {
        req.flash('message_error', 'Rellene los campos solicitados');
        res.redirect('/register/create-acount');
    } 
});

// Session
route.post('/register/login', async (req, res) => {
    const {Email, Password} = req.body;
    if (Email.length !== 0) {
        const email = {Email};
        const pass = {Password};
        const query = await pool.query('SELECT * FROM users WHERE ?', [email]);
        if (query.length !== 0) {
            if (pass.Password == query[0]['Password']) {
                req.flash('message_welcome', 'Bienvenido');
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
    } else {
        req.flash('message_error', 'Rellena los campos');
        res.redirect('/register/login');
    }
});


route.get('/sales/edit/:id', async (req, res) => {
    const { id } = req.params;
    const articleEdit = await pool.query('SELECT ID_article, a.Name as NameArt, Price, Description, Img, View, Discount, fk_user, c.Name as NameCat FROM article as a JOIN categories as c ON ID_categories = fk_category WHERE ID_article = ?', [id]);
    res.render('edit', {articleEdit: articleEdit[0]});
});

route.post('/sales/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {Name, Price, Description, Discount, fk_category} = req.body;
    
    const { originalname } = req.file ? req.file : 0;
    const Img = originalname;

    if (Img == undefined) {
        // No Image
        const update = {Name, Price, Discount, Description, fk_category};
        await pool.query('UPDATE article SET ? WHERE ID_article = ?', [update, id]);
    } else {
        const update = {Name, Price, Discount, Description, Img,fk_category};
        await pool.query('UPDATE article SET ? WHERE ID_article = ?', [update, id]);
    }
    req.flash('message_success', 'Articulo actualizado');
    res.redirect('/profile');
});

route.get('/store/user/:id', async (req, res) =>{
    const {id} = req.params;
    const articles_from_user = await pool.query('SELECT ID_article, ID_user, a.Name as "NameArt" , u.Name as "NameUser", Price, Description, Img, View, Discount, fk_category FROM article as a JOIN users as u ON fk_user = ID_user WHERE ID_user = ?', [id]);
    res.render('trader', {articles_from_user});

});

route.get('/profile', async (req, res) => {
    if (req.session.user) {
        const Email = req.session.user.Email;
        const data_profile = await pool.query('SELECT ID_article, ID_user, a.Name as "NameArt" , u.Name as "NameUser", Price, Description, Img, View, Discount, fk_category FROM users as u JOIN article as a ON fk_user = ID_user WHERE Email = ?', [Email]);
        const sales = await pool.query('SELECT * FROM sale_details WHERE Seller_id = ?', [req.session.user.ID_user]);
        if (sales) {
            res.render('profile', {data_profile, sales});
            return null;
        }
        res.render('profile', {data_profile});
    } else {
        req.flash('message_error', 'Necesitas Iniciar Sesión');
        res.redirect('/register/login');
    }
});

route.post('/delete/article/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM article WHERE ID_article = ?', [id]);
    req.flash('message_success', 'Articulo eliminado con exito');
    res.redirect('/profile');
});

route.get('/process-pay', (req, res) => {
    res.render('pay');
});

route.get('/process-pay/step-one', (req, res) => {
    if (req.session.user) {
        let { Direction, Street, Postal_Code, Reference, Tell } = req.body;
        const errors = [];
        res.render('partials/step_one', {Direction, Street, Postal_Code, Reference, Tell, errors});
        return null;
    }
    req.flash('message_error', 'Necesitas Iniciar Sesión');
    res.redirect('/register/login');
});

route.post('/process-pay/step-one', async (req, res) => {
    let { Count_arr, arr_ids, arr_sellers, Direction, Street, Postal_Code, Reference, Tell, Credit_card, Credit_name, Credit_date, Credit_code } = req.body;
    const errors = [];
    Direction = Direction !== undefined ? Direction : undefined;
    Street = Street !== undefined ? Street : undefined;
    Postal_Code = Postal_Code !== undefined ? Postal_Code : undefined;
    Reference = Reference !== undefined ? Reference : undefined;
    Tell = Tell !== undefined ? Tell : undefined;
    // IF empty
    if (Direction.length == 0 || Street.length == 0 || Postal_Code.length == 0 || Reference.length == 0 || Tell.length == 0 || Credit_card.length == 0 || Credit_name.length == 0 || Credit_date.length == 0 || Credit_code == 0) {
        errors.push({text: 'Rellena los datos'});
        res.render('partials/step_one', {Direction, Street, Postal_Code, Reference, Tell, errors});
        return null;
    }
    // Success
    const user_id = req.session.user.ID_user;
    const insert = { Direction, Street, Postal_Code, Reference, Tell, User_id_fk : user_id};
    
        // if Exist this Direcction
    const exist = await pool.query('SELECT User_id_fk FROM direction_user');
    if (exist.length == 0) {
        await pool.query('INSERT INTO direction_user SET ?', [insert]);
    } else {
        await pool.query('UPDATE direction_user SET ? WHERE User_id_fk = ?', [insert, user_id]);
    }
    
    const id_seller = JSON.parse(arr_sellers);
    const id_article = JSON.parse(arr_ids);
    for (let i = 0; i < Count_arr; i++) {
        await pool.query('INSERT INTO sale_details SET Article_id = ?, Seller_id = ?, Buyer_id = ?', [id_article[i].id, id_seller[i].id, user_id]);    
    }
    res.send('ok');
});

route.get('/sales/details', async (req, res) =>{
    if (req.session.user) {
        const sales = await pool.query('SELECT * FROM sale_details JOIN article JOIN users ON ID_article = Article_id AND ID_user = Buyer_id WHERE Seller_id = ?', [req.session.user.ID_user]);
        console.log(sales);
        res.render('partials/sales_details', {sales});
        return null;
    }
    res.redirect('/register/login');

});

module.exports = route;