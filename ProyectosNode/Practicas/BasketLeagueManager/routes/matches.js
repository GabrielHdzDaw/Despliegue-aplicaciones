import e from "express";
import mongoose from "mongoose";
import { Match } from "../models/match.js";
import { Team } from "../models/team.js";

const router = e.Router();

// Get matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("homeTeam", "name")
      .populate("awayTeam", "name")
      .populate("playerStats.player", "name nickname")
      .populate("playerStats.team", "name");
    if (!matches) {
      return res.status(404).send({ error: "Matches not found", result: null });
    }
    res.status(200).send({ error: null, result: matches });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
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
      return res.status(404).send({ error: "Match not found", result: null });
    }
    res.status(200).send({ error: null, result: match });
  } catch (err) {
    return res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Add a match
router.post("/", async (req, res) => {
  try {
    const { tournament, date, stage, homeTeam, awayTeam, homeScore, awayScore } = req.body;
    if (!tournament || !date || !stage || !homeTeam || !awayTeam || !homeScore || !awayScore) {
      return res.status(400).send({ error: "Missing required fields", result: null });
    }

    const homeTeamExists = await Team.findById(homeTeam);
    const awayTeamExists = await Team.findById(awayTeam);

    if (!homeTeamExists) {
      return res.status(404).send({ error: "Home team not found", result: null });
    }
    if (!awayTeamExists) {
      return res.status(404).send({ error: "Away team not found", result: null });
    }
    if (homeTeam === awayTeam) {
      return res.status(400).send({ error: "Home team and away team can't be the same team", result: null });
    }
    const newMatch = new Match(req.body);

    const savedMatch = newMatch.save();

    const populatedMatch = await Match.findById(savedMatch._id)
      .populate("homeTeam", "name")
      .populate("awayTeam", "name")
      .populate("playerStats.player", "name nickname")
      .populate("playerStats.team", "name");

    res.status(201).send({ error: null, result: populatedMatch });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Delete a match
router.delete("/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).send({ error: "Match not found", result: null });
    }
    res.status(200).send({ error: null, result: match });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

export default router;
