var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('date-digit', { title: 'date-digit' });
});

module.exports = router;
