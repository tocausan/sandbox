const express = require('express'),
    router = express.Router();

const apps = [
    'index',
    'k2000',
    'magic-word',
    'hello-doodle',
    'shadow-list',
    'date-digit',
    'clock-digit',
    'speech-synthesis',
    'pinky',
    'psychedelik',
    'distance-computer',
    'order-form',
    'command-line',
    'entity',
    'intelligent-entity',
    'cube',
    'cube-wall',
    'collision',
    'square-clock',
    'cube-inception',
    'file-uploader'
];

router.get('/', function (req, res, next) {
    res.redirect('index');
});

apps.forEach((app) = > {
    router.get('/' + app, function (req, res, next) {

    res.render('template', {
        title: app,
        view: '../public/' + app + '/main.ejs',
        style: '../' + app + '/main.css',
        script: '../' + app + '/main.js',
        links: apps.slice(1, apps.length)
    });
});
})
;


module.exports = router;
