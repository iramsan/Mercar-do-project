const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');
const { PORT } = require('./env');

// Initializations
const app = express();
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Settings
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(multer({storage}).single('Img'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global variables
app.use((req, res, next) => {
    app.locals.user = req.session.user;
    app.locals.message_error = req.flash('message_error')[0];
    app.locals.message_success = req.flash('message_success')[0];
    app.locals.message_welcome = req.flash('message_welcome')[0];
    next();
});

// Routes
app.use(require('./routes/links'));
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), (req, res) => {
    console.log('Port Up: ', app.get('port'));
});