import e from "express";
import mongoose from "mongoose";
import playersRouter from "./routes/players.js";
import teamsRouter from "./routes/teams.js";
import matchesRouter from "./routes/matches.js";
import authRouter from "./routes/auth.js";
import teapotRouter from "./routes/teapot.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to basketleaguemanager db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = e();

app.use(e.json());

app.use("/players", playersRouter);
app.use("/teams", teamsRouter);
app.use("/matches", matchesRouter);
app.use("/auth", authRouter);
app.use("/teapot", teapotRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
