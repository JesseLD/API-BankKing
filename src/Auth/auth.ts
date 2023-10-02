import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;

const auth = (request: Request, response: Response, next: NextFunction) => {
  const tokenHeader = request.headers["authorization"];

  if (tokenHeader && tokenHeader.startsWith("Bearer ")) {
    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        err.name === "TokenExpiredError"
          ? response.status(400).json({ error: "Session expired" })
          : response.status(401).json({ error: "Invalid auth token!" });
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    return response.status(403).json({ error: "You not have permission!" });
  }
};

export default auth;
