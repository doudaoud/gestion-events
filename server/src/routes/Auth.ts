import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import 
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
      async (req: express.Request, res: express.Response) => {
          const clientInfoLogin = req.body
          const userexist = await 
    },
  ),
);
