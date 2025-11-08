import e from "express";

let app = e();

app.get('/bienvenida', (req,res) =>{
  res.send("Hola, bienvenido/a");
})

app.listen(8080);
