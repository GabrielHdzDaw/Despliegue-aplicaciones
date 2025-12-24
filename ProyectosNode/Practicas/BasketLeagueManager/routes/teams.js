import e from "express";
import { Team } from "../models/team.js";
import { Player } from "../models/player.js";
import { Match } from "../models/match.js";
import { authMiddleware } from "../auth/auth.js";

const router = e.Router();

router.use((req, res, next) => {
  console.log("Petition from: ", req.ip, "to Teams");
  next();
});

// Obtain all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    if (!teams) {
      return res.status(404).send({ error: "Teams not found", result: null });
    }
    return res.status(200).send({ error: null, result: teams });
  } catch (err) {
    return res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Obtain team info by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send({ error: "Team not found", result: null });
    }
    res.status(200).send({ error: null, result: team });
  } catch (err) {
    return res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Add a team
router.post("/", authMiddleware("admin"), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Missing required fields: name", result: null });
    }
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).send({ error: "Team with this name already exists", result: null });
    }
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();

    res.status(201).send({ error: null, result: savedTeam });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Add a player to roster
router.post("/:id/roster", authMiddleware("admin", "manager"), async (req, res) => {
  try {
    const { player, joinDate, active } = req.body;
    if (!player || !joinDate || !active || active === undefined) {
      return res.status(400).send({ error: "Missing required fields", result: null });
    }
    const team = await Team.findById(req.params.id).populate("roster.player");
    if (!team) {
      return res.status(404).send({ error: "Team not found", result: null });
    }
    const existingPlayer = await Player.findById(player);
    if (!existingPlayer) {
      return res.status(404).send({ error: "Player not found", result: null });
    }
    const activeInOtherTeam = await Team.findOne({ "roster.player": player, "roster.active": true });
    if (activeInOtherTeam) {
      return res.status(400).send({ error: "Player is already active in another team", result: null });
    }
    const activeInThisTeam = team.roster.find((p) => p.player.toString() === player.toString() && p.active);
    if (activeInThisTeam) {
      return res.status(400).send({ error: "Player is already active in this team", result: null });
    }
    team.roster.push({ player, joinDate, active });
    const updatedTeam = await team.save();

    const populatedTeam = await Team.findById(req.params.id).populate("roster.player");
    res.status(200).send({ error: null, result: populatedTeam });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

//Deactivate a player
router.delete("/:id/roster/:playerId", authMiddleware("admin", "manager"), async (req, res) => {
  try {
    const existingPlayer = await Player.findById(req.params.playerId);
    if (!existingPlayer) {
      return res.status(404).send({ error: "Player not found", result: null });
    }

    const team = await Team.findById(req.params.id).populate("roster.player");
    if (!team) {
      return res.status(404).send({ error: "Team not found", result: null });
    }

    const activeInThisTeam = team.roster.find((p) => p.player._id.toString() === req.params.playerId && p.active);
    if (!activeInThisTeam) {
      return res.status(404).send({ error: "Player is not active in this team's roster", result: null });
    }

    activeInThisTeam.active = false;

    const updatedTeam = await team.save();

    res.status(200).send({ error: null, result: updatedTeam });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

//Delete a team
router.delete("/:id", authMiddleware("admin"), async (req, res) => {
  try {
    const appearsAtMatchAsHomeTeam = await Match.findOne({ homeTeam: req.params.id });
    const appearsAtMatchAsAwayTeam = await Match.findOne({ awayTeam: req.params.id });
    if (appearsAtMatchAsHomeTeam || appearsAtMatchAsAwayTeam) {
      return res.status(400).send({ error: "Team has associated matches", result: null });
    }

    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).send({ error: "Team not found", result: null });
    }
    res.status(200).send({ error: null, result: team });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err}`, result: null });
  }
});

export default router;
