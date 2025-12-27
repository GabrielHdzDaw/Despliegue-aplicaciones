import e from "express";
import { Player } from "../models/player.js";
import { Team } from "../models/team.js";
import { authMiddleware } from "../auth/auth.js";

const router = e.Router();

router.use((req, res, next) =>{
  console.log("Petition from: ", req.ip, "to Players");
  next();
})


// Obtain all players
router.get("/", authMiddleware(), async (req, res) => {
  try {
    const players = await Player.find();
    if (!players) {
      return res.status(404).send({ error: "Players not found", result: null });
    }
    return res.status(200).send({ error: null, result: players });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Obtain player by name
router.get("/find", authMiddleware(), async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).send({ error: "Missing search parameter: name", result: null });
    }
    const player = await Player.findOne({ name: { $regex: req.query.name, $options: "i" } });
    if (!player) {
      return res.status(404).send({ error: "Player not found", result: null });
    }
    return res.status(200).send({ error: null, result: player });
  } catch (err) {
    return res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Obtain player info by ID
router.get("/:id", authMiddleware(), async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send({ error: "Player not found", result: null });
    }
    return res.status(200).send({ error: null, result: player });
  } catch (err) {
    return res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Add a player
router.post("/", authMiddleware("admin"), async (req, res) => {
  try {
    const { name, nickname, country, birthDate, role } = req.body;
    if (!name || !nickname || !country || !birthDate || !role) {
      return res.status(400).send({ error: "Missing required fields", result: null });
    }
    const existingPlayer = await Player.findOne({ nickname });
    if (existingPlayer) {
      return res.status(400).send({ error: "Player with this nickname already exists", result: null });
    }
    const newPlayer = new Player(req.body);
    const savedPlayer = await new Player(req.body).save();

    res.status(201).send({ error: null, result: savedPlayer });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Update a player by ID
router.put("/:id", authMiddleware("admin"), async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send({ error: "Player not found", result: null });
    }
    const { nickname } = req.body;
    const existingPlayer = await Player.findOne({ nickname });
    if (existingPlayer) {
      return res.status(400).send({ error: "Player with this nickname already exists", result: null });
    }
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({ error: null, result: updatedPlayer });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

// Delete a player by ID
router.delete("/:id", authMiddleware("admin"), async (req, res) => {
  try {
    const activeInTeam = await Team.findOne({ "roster.player": req.params.id, "roster.active": true });
    if (activeInTeam) {
      return res.status(400).send({ error: "Cannot delete player because they're active in a team", result: null });
    }
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) {
      return res.status(404).send({ error: "Player not found", result: null });
    }
    res.status(200).send({ error: null, result: deletedPlayer });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

export default router;
