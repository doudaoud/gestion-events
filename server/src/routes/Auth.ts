import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import byctypt from "bcryptjs";
const AuthRouter: express.Router = express.Router();
/**
 * @method POST
 * @route /auth/login
 * @despcription Route pour la connexion d'un utilisateur
 * @access public
 */

AuthRouter.post(
  "/Login",
  expressAsyncHandler(async (req: express.Request, res: express.Response) => {
    const clientInfoLogin = req.body;
    const userexist = await User.findOne({
      email: clientInfoLogin.email,
    }).select("+passwordHash");
    if (!userexist) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    const password_correct: boolean = await byctypt.compare(
      clientInfoLogin.password,
      userexist.passwordHash,
    );
    if (!password_correct) {
      res.status(401).json({ message: "mot de passe incorrect" });
      return;
    }
  }),
);
