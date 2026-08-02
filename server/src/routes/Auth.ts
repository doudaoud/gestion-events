import express from "express";
import "dotenv/config";
import expressAsyncHandler from "express-async-handler";
import { User, UserType } from "../models/user.models.js";
import { PendingRegistration } from "../models/pendingRegistration.models.js";
import { auditLogmodels, ActionType } from "../models/auditLog.models.js";
import { sendConfirmationEmail } from "../utils/serviceMail.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import { IUser } from "../models/user.models.js";
import { requireAuth } from "../middleware/auth.js";

const AuthRouter: express.Router = express.Router();

function signSessionToken(user: { _id: unknown; role: UserType }): string {
  return jsonWebToken.sign(
    { userId: user._id, role: user.role },
    process.env.SECRET_KEY_JWT as string,
    { expiresIn: "1h" },
  );
}

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
        return;
      }
      const userexist = await User.findOne({
        email: clientInfoLogin.email,
      }).select("+passwordHash");
      if (!userexist) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }
      const password_correct: boolean = await bcrypt.compare(
        clientInfoLogin.password,
        userexist.passwordHash,
      );
      if (!password_correct) {
        await auditLogmodels.create({
          action: ActionType.connexionfailed,
          userID: userexist._id,
          ipAddress: req.ip,
        });
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      await auditLogmodels.create({
        action: ActionType.connexionSucees,
        userID: userexist._id,
        ipAddress: req.ip,
      });
      const token = signSessionToken(userexist);

      res.status(200).json({
        message: "Connexion réussie",
        token,
        role: userexist.role,
        verified: userexist.verified,
      });
      return;
    },
  ),
);

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
      const passwordHash: string = await bcrypt.hash(
        clientInfoRegister.password,
        salt,
      );

      const code_verification: string = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      // Les infos de l'utilisateur ne sont sauvegardées qu'apres verification du code
      // pour eviter de creer des comptes non verifies, et le mot de passe (meme hashe)
      // ne transite jamais vers le client.
      await PendingRegistration.findOneAndUpdate(
        { email: clientInfoRegister.email },
        {
          fullName: clientInfoRegister.fullName,
          email: clientInfoRegister.email,
          passwordHash,
          role: UserType.USER,
          code_verification,
          createdAt: new Date(),
        },
        { upsert: true },
      );

      await sendConfirmationEmail(clientInfoRegister.email, code_verification);

      res.status(201).json({
        message: "inscription reussie, un mail de confirmation a été envoyé",
        email: clientInfoRegister.email,
      });
      return;
    },
  ),
);

/**
 * @method POST
 * @route /auth/verify-email
 * @despcription route pour verifier le code envoye par mail et creer le compte utilisateur
 * @access public
 */

AuthRouter.post(
  "/verify-email",
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const { email, otp } = req.body;
      if (!email || !otp) {
        res.status(400).json({ message: "Email et code requis" });
        return;
      }

      const pending = await PendingRegistration.findOne({ email });
      if (!pending) {
        res.status(400).json({
          message:
            "Votre code a expiré ou est introuvable, veuillez recommencer l'inscription.",
        });
        return;
      }
      if (pending.code_verification !== otp) {
        res.status(400).json({ message: "Code de vérification incorrect." });
        return;
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        await PendingRegistration.deleteOne({ email });
        res.status(400).json({ message: "email deja existe" });
        return;
      }

      const new_user = await User.create({
        fullName: pending.fullName,
        email: pending.email,
        passwordHash: pending.passwordHash,
        role: pending.role,
        verified: pending.role === UserType.USER,
      });
      await PendingRegistration.deleteOne({ email });

      await auditLogmodels.create({
        action: ActionType.createAccount,
        userID: new_user._id,
        ipAddress: req.ip,
      });

      const token = signSessionToken(new_user);
      res.status(200).json({
        message: "Compte vérifié avec succès",
        token,
        role: new_user.role,
        verified: new_user.verified,
      });
      return;
    },
  ),
);

/**
 * @method PATCH
 * @route /auth/role
 * @despcription route pour choisir le type de profil (user ou organizer) apres verification de l'email
 * @access private
 */

AuthRouter.patch(
  "/role",
  requireAuth,
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const { role } = req.body;
      if (role !== UserType.USER && role !== UserType.ORGANIZER) {
        res.status(400).json({ message: "Type de profil invalide" });
        return;
      }

      const user = await User.findById(req.auth?.userId);
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable" });
        return;
      }

      user.role = role;
      // un utilisateur classique est actif immediatement, un organisateur doit
      // passer par la verification d'identite avant d'etre considere comme verifie
      user.verified = role === UserType.USER;
      await user.save();

      const token = signSessionToken(user);
      res.status(200).json({
        message: "Profil mis à jour",
        token,
        role: user.role,
        verified: user.verified,
      });
      return;
    },
  ),
);

/**
 * @method POST
 * @route /auth/organizer/documents
 * @despcription route pour soumettre les documents d'identite d'un organisateur pour validation
 * @access private
 */

AuthRouter.post(
  "/organizer/documents",
  requireAuth,
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const { idFront, idBack } = req.body;
      if (!idFront || !idBack) {
        res
          .status(400)
          .json({ message: "Le recto et le verso de la pièce d'identité sont requis" });
        return;
      }
      if (req.auth?.role !== UserType.ORGANIZER) {
        res
          .status(403)
          .json({ message: "Réservé aux comptes organisateur" });
        return;
      }

      const user = await User.findById(req.auth.userId);
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable" });
        return;
      }

      user.carteNationale = JSON.stringify({ front: idFront, back: idBack });
      await user.save();

      await auditLogmodels.create({
        action: ActionType.demande_organizateur,
        userID: user._id,
        ipAddress: req.ip,
      });

      res.status(200).json({
        message: "Documents soumis, en attente de validation par un administrateur",
      });
      return;
    },
  ),
);

export default AuthRouter;
