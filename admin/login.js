var express = require('express');
var router = express.Router();
usuariosModel = require('../../models/usuariosModel');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.get('/logout', function (req, res, next) 
{
    req.session.destroy()
    res.render('admin/login',
        {
            layout: 'admin/layout'
        }

            )
}
        ); 

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        // console.log(req.body);

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
        if (data != undefined) {

            req.session.id_usuario = data.id; // Variable de sesión que guarda el Id
            req.session.nombre = data.usuario; // Variable de sesión que guarda el nombre

            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;