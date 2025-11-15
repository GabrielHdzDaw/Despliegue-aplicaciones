import e from "express";
import { Team } from "../models/team.js";

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
export default router;
