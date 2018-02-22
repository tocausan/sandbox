var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('hello-doodle', { title: 'hello-doodle' });
});

module.exports = router;
