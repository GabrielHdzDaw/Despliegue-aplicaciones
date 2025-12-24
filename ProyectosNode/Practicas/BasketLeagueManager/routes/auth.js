import e from "express";
import { generateToken } from "../auth/auth.js";
import { User } from "../models/user.js";

const router = e.Router();

router.use((req, res, next) => {
  console.log("Petition from: ", req.ip, "to Auth");
  next();
});

router.post("/login", async (req, res) => {
  try {
    if (req.body.login && req.body.password) {
      const user = await User.findOne({ login: req.body.login, password: req.body.password });
      if (user && user.password === req.body.password) {
        return res.status(200).send({ error: null, result: { token: generateToken(user) } });
      }
    }
    return res.status(401).send({ error: "Not authorized", result: null });
  } catch (err) {
    res.status(500).send({ error: `Internal server error: ${err.message}`, result: null });
  }
});

export default router;
