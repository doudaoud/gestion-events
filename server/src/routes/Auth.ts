import express from "express";
import "dotenv/config";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.models.js";
import { auditLogmodels, ActionType } from "../models/auditLog.models.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
const AuthRouter: express.Router = express.Router();
/**
 * @method POST
 * @route /auth/login
 * @despcription Route pour la connexion d'un utilisateur
 * @access public
 */

AuthRouter.post(
  "/Login",
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const clientInfoLogin = req.body;
      const { error } = validateUserLogin(clientInfoLogin);
      if (error) {
        res.status(400).json({
          message: error.details[0].message,
        });
      }
      const userexist = await User.findOne({
        email: clientInfoLogin.email,
      }).select("+passwordHash");
      if (!userexist) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }
      const password_correct: boolean = await bcrypt.compare(
        clientInfoLogin.password,
        userexist.passwordHash,
      );
      if (!password_correct) {
        console.log("mot de passe incorrect");
        console.log(
          "il faut faire l'audit log pour la tentative de connexion infructueuse",
        );
        //comme ca jai fair laudit pour laction de connxtion errone
        const new_action = await auditLogmodels.create({
          action: ActionType.connexionfailed,
          userID: userexist._id,
          ipAddress: req.ip,
        });
        res
          .status(401)
          .json({ message: "mot de passe incorrect", actionLog: new_action });
        return;
      }

      //  TODO cree le token et le passeer pour la connxion
      const secret_key: string | undefined = process.env.SECRET_KEY_JWT;
      const token: string = jsonWebToken.sign(
        { userId: userexist._id, role: userexist.role },
        secret_key as string,
        { expiresIn: "1h" },
      );

      res
        .status(200)
        .json({ message: "les infos de client sont juste", token });
      return;
    },
  ),
);

export default AuthRouter;

/**
 * @method POST
 * @route /auth/register
 * @despcription route pour linscription d'un utilisateur
 * @access public
 */

AuthRouter.post(
  "/Register",
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const { error } = validateUserRegister(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const clientInfoRegister = req.body;
    },
  ),
);
