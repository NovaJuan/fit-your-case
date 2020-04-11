"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const exphbs = require("express-handlebars");
const colors = require("colors");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
// Config ENV variables
dotenv.config({
    path: path.join(__dirname, 'config/config.env'),
});
// Settings
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
// Setup static files
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/', require('./routes/index'));
// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(colors.inverse.green(`Server running on port ${PORT}`));
});
