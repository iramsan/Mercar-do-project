const express = require('express');
const path = require('path');
const multer = require('multer');

// Initializations
const app = express();
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(multer({storage}).single('Img'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(require('./routes/links'));
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), (req, res) => {
    console.log('Port Up: ', app.get('port'));
});