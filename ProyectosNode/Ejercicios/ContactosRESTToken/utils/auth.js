// Importamos el módulo 'jsonwebtoken' para trabajar con tokens JWT
const jwt = require('jsonwebtoken');

// Clave secreta utilizada para firmar y verificar los tokens JWT
const secreto = "secretoNode";

// Función que genera un token JWT basado en el nombre de usuario
// El token tiene una duración de 2 horas
let generarToken = login => jwt.sign({login: login}, secreto, {expiresIn: "2 hours"});

// Función para validar un token JWT recibido
// Devuelve los datos decodificados del token si es válido
let validarToken = token => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) {}
}

// Middleware para proteger rutas restringidas
// Verifica que el token sea válido antes de permitir el acceso a la ruta
let protegerRuta = (req, res, next) => {
    
    // Obtiene el token del encabezado 'Authorization' de la solicitud
    let token = req.headers['authorization'];
    
    // Comprueba que el token existe y comienza con "Bearer "
    if (token && token.startsWith("Bearer ")) 
    {    
        // Elimina el prefijo "Bearer " para obtener solo el token
        token = token.slice(7);
    
        if (validarToken(token))            
            next(); // Si es válido, permite el acceso a la ruta
        else
            res.send({ok: false, error: "Usuario no autorizado"});
    } else     
        // Si el token no existe o no tiene el formato correcto, responde con un error
        res.send({ok: false, error: "Usuario no autorizado"});
}

    
// Exportamos las funciones para poder usarlas en otros módulos de la aplicación
module.exports = {
    generarToken: generarToken,
    validarToken: validarToken,
    protegerRuta: protegerRuta
};