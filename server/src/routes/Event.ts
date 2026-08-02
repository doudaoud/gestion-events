import express from "express";
import "dotenv/config";
import expressAsyncHandler from "express-async-handler";
import { Event, validateEvent } from "../models/event.models.js";
import { UserType } from "../models/user.models.js";
import { auditLogmodels, ActionType } from "../models/auditLog.models.js";
import { requireAuth } from "../middleware/auth.js";

const EventRouter: express.Router = express.Router();

function requireOrganizer(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  if (req.auth?.role !== UserType.ORGANIZER) {
    res.status(403).json({ message: "Réservé aux comptes organisateur" });
    return;
  }
  next();
}

/**
 * @method POST
 * @route /events
 * @despcription creation d'un evenement par un organisateur
 * @access private (organizer)
 */
EventRouter.post(
  "/",
  requireAuth,
  requireOrganizer,
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const { error } = validateEvent(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const new_event = await Event.create({
        ...req.body,
        organizer: req.auth?.userId,
      });

      await auditLogmodels.create({
        action: ActionType.createdevent,
        userID: req.auth?.userId,
        ipAddress: req.ip,
      });

      res.status(201).json({ message: "Événement créé", event: new_event });
      return;
    },
  ),
);

/**
 * @method GET
 * @route /events
 * @despcription liste de tous les evenements (public)
 * @access public
 */
EventRouter.get(
  "/",
  expressAsyncHandler(
    async (_req: express.Request, res: express.Response): Promise<void> => {
      const events = await Event.find()
        .sort({ date_Begin: 1 })
        .populate("organizer", "fullName");
      res.status(200).json({ events });
      return;
    },
  ),
);

/**
 * @method GET
 * @route /events/mine
 * @despcription liste des evenements crees par l'organisateur connecte
 * @access private (organizer)
 */
EventRouter.get(
  "/mine",
  requireAuth,
  requireOrganizer,
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const events = await Event.find({ organizer: req.auth?.userId }).sort({
        date_Begin: 1,
      });
      res.status(200).json({ events });
      return;
    },
  ),
);

/**
 * @method GET
 * @route /events/:id
 * @despcription details d'un evenement (public)
 * @access public
 */
EventRouter.get(
  "/:id",
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const event = await Event.findById(req.params.id).populate(
        "organizer",
        "fullName",
      );
      if (!event) {
        res.status(404).json({ message: "Événement introuvable" });
        return;
      }
      res.status(200).json({ event });
      return;
    },
  ),
);

/**
 * @method DELETE
 * @route /events/:id
 * @despcription suppression d'un evenement par son organisateur
 * @access private (organizer, proprietaire)
 */
EventRouter.delete(
  "/:id",
  requireAuth,
  requireOrganizer,
  expressAsyncHandler(
    async (req: express.Request, res: express.Response): Promise<void> => {
      const event = await Event.findById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Événement introuvable" });
        return;
      }
      if (event.organizer.toString() !== req.auth?.userId) {
        res
          .status(403)
          .json({ message: "Vous ne pouvez supprimer que vos propres événements" });
        return;
      }

      await event.deleteOne();
      await auditLogmodels.create({
        action: ActionType.deletedevent,
        userID: req.auth?.userId,
        ipAddress: req.ip,
      });

      res.status(200).json({ message: "Événement supprimé" });
      return;
    },
  ),
);

export default EventRouter;
