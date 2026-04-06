import { z } from "zod";
import { Idea } from "../models/Idea.js";
import { generateIdeaAnalysis } from "../services/aiService.js";

const ideaInputSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
});

export async function createIdea(req, res, next) {
  try {
    const { title, description } = ideaInputSchema.parse(req.body);
    const analysis = await generateIdeaAnalysis({ title, description });

    const idea = await Idea.create({ title, description, analysis });
    res.status(201).json(idea);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid request",
        issues: error.issues,
      });
    }

    if (error.name === "AIValidationError") {
      return res.status(502).json({
        message: error.message,
        issues: error.issues,
      });
    }

    next(error);
  }
}

export async function getIdeas(_req, res, next) {
  try {
    const ideas = await Idea.find(
      {},
      {
        title: 1,
        description: 1,
        createdAt: 1,
        "analysis.risk_level": 1,
        "analysis.profitability_score": 1,
      },
    )
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(ideas);
  } catch (error) {
    next(error);
  }
}

export async function getIdeaById(req, res, next) {
  try {
    const idea = await Idea.findById(req.params.id).lean();
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
}

export async function deleteIdea(req, res, next) {
  try {
    const deleted = await Idea.findByIdAndDelete(req.params.id).lean();
    if (!deleted) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
