import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "contactos",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  charset: "utf8mb4",
});

pool.getConnection((error, connection) => {
  if (error) console.log("Error al conectar con la BD:", error);
  else console.log("Conexión satisfactoria");
});

async function listarContactos() {
  const [resultado] = await pool.query("SELECT * FROM contactos");
  resultado.forEach((c) => console.log(c.nombre, ":", c.telefono));
}
listarContactos();
