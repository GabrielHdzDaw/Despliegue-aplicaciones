import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "libros",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  charset: "utf8mb4",
});

pool.getConnection((error, connection) => {
  if (error) console.log("Error al conectar con la BD:", error);
  else console.log("Conexión satisfactoria");
});

const arrayLibros = [
  { titulo: "Lentejas", autor: "patatas", precio: 240 },
  { titulo: "Cocido", autor: "garbanzos", precio: 320 },
  { titulo: "Ensalada", autor: "lechuga", precio: 180 },
];

async function insertarLibro(titulo, autor, precio) {
  try {
    const [resultado] = await pool.query("INSERT INTO libros SET ?", { titulo: titulo, autor: autor, precio: precio });
    console.log(resultado);
  } catch (err) {
    console.log(err.message);
  }
}

// arrayLibros.forEach((libro) => {
//   insertarLibro(libro.titulo, libro.autor, libro.precio);
// });

async function listarLibros() {
  const [resultado] = await pool.query("SELECT * FROM libros");
  resultado.forEach((l) => console.log(l.titulo, ":", l.autor, ":", l.precio));
}

async function listarLibros10euros() {
  const [resultado] = await pool.query("SELECT * FROM libros WHERE precio = 10");
  resultado.forEach((l) => console.log(l.titulo, ":", l.autor));
}

async function modificarPrecio(id, nuevoPrecio){
  const [resultado] = await pool.query("")
}

listarLibros();
listarLibros10euros();
