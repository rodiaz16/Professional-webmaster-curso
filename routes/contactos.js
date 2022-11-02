var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contactos');
});

module.exports = router;

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var tel = req.body.tel;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'rodiaz16@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " se contacto a través de la página web y quiere más información a este correo: "
      + email + ". < br > Además, hizo este comentario: "
      + mensaje + ".< br > su tel es : " + tel
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  var info = await transport.sendMail(obj);
  res.render('contactos', {
    message: 'El mensaje fue enviado correctamente'
  });
});