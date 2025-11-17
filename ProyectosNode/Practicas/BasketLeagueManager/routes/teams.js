import e from "express";
import { Team } from "../models/team.js";
import { Player } from "../models/player.js";
import { Match } from "../models/match.js";

const router = e.Router();

// Obtain all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    if (!teams) {
      return res.status(404).send({ ok: false, result: "Teams not found" });
    }
    return res.status(200).send({ ok: true, result: teams });
  } catch (err) {
    return res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Obtain team info by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send({ ok: false, result: "Team not found" });
    }
    res.status(200).send({ ok: true, result: team });
  } catch (err) {
    return res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Add a team
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ ok: false, result: "Missing required fields: name" });
    }
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).send({ ok: false, result: "Team with this name already exists" });
    }
    const newTeam = new Team(req.body);
    const savedTeam = newTeam.save();

    res.status(201).send({ ok: true, result: savedTeam });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Add a player to roster
router.post("/:id/roster", async (req, res) => {
  try {
    const { player, joinDate, active } = req.body;
    if (!player || !joinDate || !active || active === undefined) {
      return res.status(400).send({ ok: false, result: "Missing required fields" });
    }
    const team = await Team.findById(req.params.id).populate("roster.player");
    if (!team) {
      return res.status(404).send({ ok: false, result: "Team not found" });
    }
    const existingPlayer = await Player.findById(player);
    if (!existingPlayer) {
      return res.status(404).send({ ok: false, result: "Player not found" });
    }
    const activeInOtherTeam = await Team.findOne({ "roster.player": player, "roster.active": true });
    if (activeInOtherTeam) {
      return res.status(400).send({ ok: false, result: "Player is already active in another team" });
    }
    const activeInThisTeam = team.roster.find((p) => p.player.toString() === player.toString() && p.active);
    if (activeInThisTeam) {
      return res.status(400).send({ ok: false, result: "Player is already active in this team" });
    }
    team.roster.push({ player, joinDate, active });
    const updatedTeam = await team.save();

    const populatedTeam = await Team.findById(req.params.id).populate("roster.player");
    res.status(200).send({ ok: true, result: populatedTeam });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

//Deactivate a player
router.delete("/:id/roster/:playerId", async (req, res) => {
  try {
    const existingPlayer = await Player.findById(req.params.playerId);
    if (!existingPlayer) {
      return res.status(404).send({ ok: false, result: "Player not found" });
    }

    const team = await Team.findById(req.params.id).populate("roster.player");
    if (!team) {
      return res.status(404).send({ ok: false, result: "Team not found" });
    }

    const activeInThisTeam = team.roster.find((p) => p.player._id.toString() === req.params.playerId && p.active);
    if (!activeInThisTeam) {
      return res.status(404).send({ ok: false, result: "Player is not active in this team's roster" });
    }

    activeInThisTeam.active = false;

    const updatedTeam = await team.save();

    res.status(200).send({ ok: true, result: updatedTeam });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

//Delete a team
router.delete("/:id", async (req, res) => {
  try {
    const appearsAtMatchAsHomeTeam = await Match.findOne({ homeTeam: req.params.id });
    const appearsAtMatchAsAwayTeam = await Match.findOne({ awayTeam: req.params.id });
    if (appearsAtMatchAsHomeTeam || appearsAtMatchAsAwayTeam) {
      return res.status(400).send({ ok: false, result: "Team has associated matches" });
    }

    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).send({ ok: false, result: "Team not found" });
    }
    res.status(200).send({ ok: true, result: team });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err}` });
  }
});

export default router;
