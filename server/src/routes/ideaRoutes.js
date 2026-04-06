import { Router } from "express";
import {
  createIdea,
  deleteIdea,
  getIdeaById,
  getIdeas,
} from "../controllers/ideaController.js";

const router = Router();

router.post("/", createIdea);
router.get("/", getIdeas);
router.get("/:id", getIdeaById);
router.delete("/:id", deleteIdea);

export default router;
