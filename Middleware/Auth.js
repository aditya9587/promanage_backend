import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const AuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "User is not logged in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    console.log(decoded)
    req.user = decoded.key;
    next();
  } catch (error) {
    res.status(401).json({ message: "User is not logged in" });
  }
};
