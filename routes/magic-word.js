var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('magic-word', { title: 'magic-word' });
});

module.exports = router;
