const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    index = require('./routes/index');

app.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'dist')))
    .use('/', index)
    .use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    })
    .use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    });

module.exports = app;
