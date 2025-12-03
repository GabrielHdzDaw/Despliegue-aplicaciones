import e from "express";
import { Player } from "../models/player.js";
import { Team } from "../models/team.js";

const router = e.Router();

router.use((req, res, next) =>{
  console.log("Petition from: ", req.ip, "to Players");
  next();
})


// Obtain all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    if (!players) {
      return res.status(404).send({ ok: false, result: "Players not found" });
    }
    return res.status(200).send({ ok: true, result: players });
  } catch (err) {
    return res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Obtain player by name
router.get("/find", async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).send({ ok: false, result: "Missing search paramenter: name" });
    }
    const player = await Player.findOne({ name: { $regex: req.query.name, $options: "i" } });
    if (!player) {
      return res.status(404).send({ ok: false, result: "Player not found" });
    }
    return res.status(200).send({ ok: true, result: player });
  } catch (err) {
    return res.status(500).send({ ok: false, result: err.message });
  }
});

// Obtain player info by ID
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send({ ok: false, result: "Player not found" });
    }
    return res.status(200).send({ ok: true, result: player });
  } catch (err) {
    return res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Add a player
router.post("/", async (req, res) => {
  try {
    const { name, nickname, country, birthDate, role } = req.body;
    if (!name || !nickname || !country || !birthDate || !role) {
      return res.status(400).send({ ok: false, result: "Missing required fields" });
    }
    const existingPlayer = await Player.findOne({ nickname });
    if (existingPlayer) {
      return res.status(400).send({ ok: false, result: "Player with this nickname already exists" });
    }
    const newPlayer = new Player(req.body);
    const savedPlayer = newPlayer.save();

    res.status(201).send({ ok: true, result: savedPlayer });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Update a player by ID
router.put("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send({ ok: false, result: "Player not found" });
    }
    const { nickname } = req.body;
    const existingPlayer = await Player.findOne({ nickname });
    if (existingPlayer) {
      return res.status(400).send({ ok: false, result: "Player with this nickname already exists" });
    }
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({ ok: true, result: updatedPlayer });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

// Delete a player by ID
router.delete("/:id", async (req, res) => {
  try {
    const activeInTeam = await Team.findOne({ "roster.player": req.params.id, "roster.active": true });
    if (activeInTeam) {
      return res.status(400).send({ ok: false, result: "Cannot delete player because they're active in a team" });
    }
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) {
      return res.status(404).send({ ok: false, result: "Player not found" });
    }
    res.status(200).send({ ok: true, result: deletedPlayer });
  } catch (err) {
    res.status(500).send({ ok: false, result: `Internal server error: ${err.message}` });
  }
});

export default router;
