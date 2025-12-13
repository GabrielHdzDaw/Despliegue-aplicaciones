app.post("/login", (req, res) => {
  let usuario = req.body.usuario;
  let password = req.body.password;

  let existeUsuario = usuarios.filter((u) => u.usuario == usuario && u.password == password);

  if (existeUsuario.length == 1) res.send({ ok: true, token: generarToken(usuario) });
  else res.send({ ok: false });
});