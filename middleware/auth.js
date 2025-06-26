import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Invalid token.");
  }
}
