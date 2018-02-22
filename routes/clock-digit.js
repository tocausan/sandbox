var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('clock-digit', { title: 'clock-digit' });
});

module.exports = router;
