var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('k2000', { title: 'k2000' });
});

module.exports = router;
