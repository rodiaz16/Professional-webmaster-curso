var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/novedades', {  //En render no va "/" solo en rutas.
        layout: 'admin/layout',
        usuario: req.session.nombre
    });
});

module.exports = router;