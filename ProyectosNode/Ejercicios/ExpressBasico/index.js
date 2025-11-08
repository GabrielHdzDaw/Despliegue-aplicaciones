import e from "express";
import os from "os";

const app = e();

app.get("/fecha", (req, res) => {
  res.send(new Date());
});

app.get("/usuario", (req, res) => {
  res.send(os.userInfo().username);
});

app.listen(8080);
