const express = require('express'),
    router = express.Router(),
    apps = [
        'index',
        'k2000',
        'magic-word',
        'hello-doodle',
        'shadow-list',
        'date-digit',
        'clock-digit'
    ];

router.get('/', function (req, res, next) {
    res.redirect('index');
});

apps.forEach((app) => {
    router.get('/' + app, function (req, res, next) {

        res.render('template', {
            title: app,
            view: '../public/' + app + '/main.ejs',
            style: '../' + app + '/main.css',
            script: '../' + app + '/main.js',
            links: apps
        });
    });
});


module.exports = router;
