// Importamos el módulo Express para manejar rutas y peticiones
const express = require('express');

// Importamos el módulo de autenticación personalizado desde utils/auth
const auth = require(__dirname + '/../utils/auth');

// Creamos un enrutador de Express para definir las rutas de autenticación
let router = express.Router();

// Simulamos la base de datos así
const usuarios = [
    { usuario: 'nacho', password: '12345' },
    { usuario: 'alex', password: 'alex111' }
];

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(u =>
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: auth.generarToken(usuario)});
    else
        res.send({ok: false});
});

// Exportamos el enrutador para usarlo en otros módulos de la aplicación
module.exports = router;