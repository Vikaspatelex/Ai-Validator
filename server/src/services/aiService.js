import OpenAI from "openai";
import { z } from "zod";
import { env } from "../config/env.js";
import { extractJson } from "../utils/extractJson.js";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const analysisSchema = z.object({
  problem: z.string(),
  customer: z.string(),
  market: z.string(),
  competitor: z.array(
    z.object({
      name: z.string(),
      differentiation: z.string(),
    })
  ).length(3),
  tech_stack: z.array(z.string()).min(4).max(6),
  risk_level: z.enum(["Low", "Medium", "High"]),
  profitability_score: z.number().int().min(0).max(100),
  justification: z.string(),
});

const systemPrompt = `You are an expert startup consultant.
Return ONLY a valid JSON object with these exact keys: problem, customer, market, competitor, tech_stack, risk_level, profitability_score, justification.
competitor must be an array of exactly 3 objects with name and differentiation.
tech_stack must be an array of 4-6 strings.
risk_level must be one of Low, Medium, High.
profitability_score must be an integer between 0 and 100.
Do not include any explanation, markdown, or text outside the JSON object.`;

async function callModel({ title, description }) {
  const completion = await openai.chat.completions.create({
    model: env.OPENAI_MODEL,
    temperature: 0.1,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Title: ${title}\nDescription: ${description}`,
      },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty response from AI model");

  return extractJson(raw);
}

export async function generateIdeaAnalysis({ title, description }) {
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const parsed = await callModel({ title, description });
      return analysisSchema.parse(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn(`AI validation failed on attempt ${attempt}:`, error.issues);
        if (attempt === maxAttempts) {
          const validationError = new Error("AI analysis validation failed");
          validationError.name = "AIValidationError";
          validationError.issues = error.issues;
          throw validationError;
        }
        continue;
      }

      console.error("Groq API Error:", error.message ?? error);
      throw error;
    }
  }

  throw new Error("AI analysis failed after retries");
}
