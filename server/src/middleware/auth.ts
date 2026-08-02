import express from "express";
import jsonWebToken from "jsonwebtoken";
import { UserType } from "../models/user.models.js";

export interface AuthPayload {
  userId: string;
  role: UserType;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

export function requireAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ message: "Authentification requise" });
    return;
  }
  try {
    const decoded = jsonWebToken.verify(
      token,
      process.env.SECRET_KEY_JWT as string,
    ) as AuthPayload;
    req.auth = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Session invalide ou expirée" });
    return;
  }
}
