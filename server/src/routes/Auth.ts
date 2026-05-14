import express from "express";
import "dotenv/config";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.models.js";
import { auditLogmodels, ActionType } from "../models/auditLog.models.js";
import { sendConfirmationEmail } from "../utils/serviceMail.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import { IUser } from "../models/user.models.js";

const AuthRouter: express.Router = express.Router();
/**
 * @method POST
 * @route /auth/login
 * @despcription Route pour la connexion d'un utilisateur
 * @access public
 */

AuthRouter.post(
  "/Login",
  // TODO audir pour la connxion correct
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

      // TODO  le mail de confermation de la connexion pour le user et laudit pour la creation coreect
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
      const userexist: IUser | null = await User.findOne({
        email: clientInfoRegister.email,
      });
      if (userexist) {
        res.status(400).json({ message: "email deja existe" });
        return;
      }
      const salt: string = await bcrypt.genSalt(10);
      const passwordHash: string = await bcrypt.hash(clientInfoRegister, salt);
      // TODO la carte nationale pour l'organizateur psq il ya un paeiment ddonc pour les arnaces

      let code_verification: number | string = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      sendConfirmationEmail(clientInfoRegister.email, code_verification);

      // cree un tokern pour le register et et faire le truc de garger les infos de user dans le token
      let new_user = new User(
        {
          firstName: clientInfoRegister.firstName,
          lastName: clientInfoRegister.lastName,
          email: clientInfoRegister.email,
          passwordHash: passwordHash,
          role: clientInfoRegister.role,
        },
        { timestamps: true },
      );
      let token_registerUser = jsonWebToken.sign(
        new_user,
        process.env.SECRET_KEY_JWT as string,
        { expiresIn: "5m" },
      );
      res.status(200).json({
        message: "inscription reussie, un mail de confirmation a été envoyé",
        code_verification: code_verification,
        token_registerUser: token_registerUser,
      });
      return;
    },
  ),
);
