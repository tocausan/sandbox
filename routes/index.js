var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'index',
        links: [
            'k2000',
            'magic-word',
            'hello-doodle',
            'shadow-list',
            'date-digit',
            'clock-digit'
        ]
    });
});

module.exports = router;
