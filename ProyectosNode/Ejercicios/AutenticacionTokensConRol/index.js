/*
    Ejemplo de autenticación basada en tokens, usando el módulo "jsonwebtoken".
    Definimos una palabra secreta para encriptar los tokens, y un array de usuarios
    registrados para simular una base de datos.

    El middleware "protegerRuta" se aplica a cada servicio con acceso restringido
*/

// Cargamos librerías necesarias
const express = require('express');
const jwt = require('jsonwebtoken');

// Palabra secreta para cifrar y verificar los tokens
const secreto = "secretoNode";

// Base de datos simulada de usuarios registrados
const usuarios = [
    { usuario: 'nacho', password: '12345', rol: 'admin' },
    { usuario: 'pepe', password: 'pepe111', rol: 'normal' }
];

// Método para generar un token JWT cuando el usuario se autentica correctamente
// Recibe el nombre de usuario y el rol como parámetros
let generarToken = (login, rol) => {
    return jwt.sign({login: login, rol: rol}, secreto, {expiresIn: "2 hours"});
};

// Método para validar un token JWT que se recibe de un usuario autenticado
let validarToken = (token) => {
    try {
        let resultado = jwt.verify(token.substring(7), secreto);
        return resultado;
    } catch (e) {}
};

// Middleware para proteger rutas según el rol requerido
// Deja pasar solo a usuarios autenticados con el rol especificado ("" si no se requiere un rol específico)
let protegerRuta = rol => {
    return (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {        
        let resultado = validarToken(token);
        // Permite el acceso si el token es válido y el rol coincide o no se requiere un rol específico
        if (resultado && (rol === "" || rol === resultado.rol))
            next();
        else
            res.send({ok: false, error: "Usuario no autorizado"});        
    } else 
        res.send({ok: false, error: "Usuario no autorizado"});        
}};

// Inicializamos la aplicación Express
let app = express();

// Configuramos Express para recibir datos en formato JSON
app.use(express.json());

// Ruta pública, sin protección, accesible sin autenticación
app.get('/', (req, res) => {
    res.send({ok: true, resultado: "Bienvenido a la ruta de inicio"});
});

// Ruta protegida sin requerir rol específico (cualquier usuario autenticado puede acceder)
app.get('/protegido', protegerRuta(""), (req, res) => {
    res.send({ok: true, resultado: "Bienvenido a la zona protegida"});
});

// Ruta protegida con rol específico (solo accesible para usuarios con rol 'admin')
app.get('/protegidoAdmin', protegerRuta("admin"), (req, res) => {
    res.send({ok: true, resultado: "Bienvenido a la zona protegida para administradores"});
});

// Ruta para hacer el login y recibir el token de acceso
app.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;

    let existeUsuario = usuarios.filter(u => 
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: generarToken(existeUsuario[0].usuario, existeUsuario[0].rol)});
    else
        res.send({ok: false});
});


// Configura el servidor para que escuche en el puerto 8080
app.listen(8080);