import mysql from "mysql2";

// Cambiar usuario y contraseña por los que tengamos en
// nuestro sistema

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "contactos",
//     connectionLimit: 10,
//     waitForConnections: true,
//     queueLimit: 0,
//     charset: "utf8mb4"
// });

// pool.getConnection((error, connection) => {
//   if (error) console.log("Error al conectar con la BD:", error);
//   else console.log("Conexión satisfactoria");
// });

let conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "contactos",
});

conexion.connect((error) => {
  if (error) console.log("Error al conectar con la BD:", error);
  else console.log("Conexión satisfactoria");
});

conexion.query("SELECT * FROM contactos", (error, resultado, campos) => {
  if (error) {
    console.log(error);
  } else {
    resultado.forEach((contacto) => {
      console.log(`ID: ${contacto.id}, Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono}`);
    });
  }
});

conexion.query("SELECT * FROM contactos WHERE id = ?", [1], (error, resultado, campos) => {
  if (error) {
    console.log(error);
  } else {
    resultado.forEach((contacto) => {
      console.log(`ID: ${contacto.id}, Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono}`);
    });
  }
});

conexion.query("INSERT INTO contactos SET ?", 
    {nombre: 'Nacho C.', telefono: '965771111'}, 
    (error, resultado, campos) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Contacto insertado, ID:", resultado);
  }
});

conexion.query("SELECT * FROM contactos", (error, resultado, campos) => {
  if (error) {
    console.log(error);
  } else {
    resultado.forEach((contacto) => {
      console.log(`ID: ${contacto.id}, Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono}`);
    });
  }
});