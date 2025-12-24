import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

export function generateToken(user) {
  return jwt.sign({ login: user.login, role: user.role }, SECRET, { expiresIn: "2 hours" });
}

export function validateToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    console.log(e.message);
  }
}

export function authMiddleware(...requiredRoles) {
  return function (req, res, next) {
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) token = token.slice(7);
    else {
      return res.status(401).send({ error: "Login incorrecto", result: null });
    }
    const user = validateToken(token);
    if (user) {
      req.user = user;
      if (requiredRoles.length === 0 || requiredRoles.includes(user.role)) {
        return next();
      } else {
        return res.status(403).send({ error: "Not authorized", result: null });
      }
    } else {
      return res.status(401).send({ error: "Login incorrecto", result: null });
    }
  };
}
