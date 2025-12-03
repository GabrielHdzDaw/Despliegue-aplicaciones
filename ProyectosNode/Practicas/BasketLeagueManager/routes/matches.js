import e from "express";
import mongoose from "mongoose";
import { Match } from "../models/match.js";
import { Team } from "../models/team.js";

const router = e.Router();

router.use((req, res, next) =>{
  console.log("Petition from: ", req.ip, "to Matches");
  next();
})


// Get matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("homeTeam", "name")
      .populate("awayTeam", "name")
      .populate("playerStats.player", "name nickname")
      .populate("playerStats.team", "name");
    if (!matches) {
      return res.status(404).send({ ok: false, result: "Matches not found" });
    }
    res.status(200).send({ ok: true, result: matches });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Obtain match info by ID
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("homeTeam", "name")
      .populate("awayTeam", "name")
      .populate("playerStats.player", "name nickname")
      .populate("playerStats.team", "name");
    if (!match) {
      return res.status(404).send({ ok: false, result: "match not found" });
    }
    res.status(200).send({ ok: true, result: match });
  } catch (err) {
    return res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Add a match
router.post("/", async (req, res) => {
  try {
    const { tournament, date, stage, homeTeam, awayTeam, homeScore, awayScore } = req.body;
    if (!tournament || !date || !stage || !homeTeam || !awayTeam || !homeScore || !awayScore) {
      return res.status(400).send({ ok: false, result: "Missing required fields" });
    }

    const homeTeamExists = await Team.findById(homeTeam);
    const awayTeamExists = await Team.findById(awayTeam);

    if (!homeTeamExists) {
      return res.status(404).send({ ok: false, result: "Home team not found" });
    }
    if (!awayTeamExists) {
      return res.status(404).send({ ok: false, result: "Away team not found" });
    }
    if (homeTeam === awayTeam) {
      return res.status(400).send({ ok: false, result: "Home team and away team can't be the same team" });
    }
    const newMatch = new Match(req.body);

    const savedMatch = newMatch.save();

    const populatedMatch = await Match.findById(savedMatch._id)
      .populate("homeTeam", "name")
      .populate("awayTeam", "name")
      .populate("playerStats.player", "name nickname")
      .populate("playerStats.team", "name");

    res.status(201).send({ ok: true, result: populatedMatch });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Delete a match
router.delete("/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).send({ ok: false, result: "Team not found" });
    }
    res.status(200).send({ ok: true, result: match });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

export default router;
