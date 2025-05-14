import express from "express";
import {
  getNotes,
  createNote,
  getSecretNotes,
} from "../controllers/notesController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Regular notes routes
router.route("/").get(protect, getNotes).post(protect, createNote);

// Secret notes route
router.route("/secret").post(protect, getSecretNotes);

export default router;
