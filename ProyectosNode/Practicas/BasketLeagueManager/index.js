import e from "express";
import mongoose from "mongoose";
import playersRouter from "./routes/players.js";
import teamsRouter from "./routes/teams.js";
import matchesRouter from "./routes/matches.js";

mongoose
  .connect("mongodb://localhost:27017/basketleaguemanager")
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

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
