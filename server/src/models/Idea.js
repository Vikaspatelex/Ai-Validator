import mongoose from "mongoose";

const competitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    differentiation: { type: String, required: true },
  },
  { _id: false },
);

const analysisSchema = new mongoose.Schema(
  {
    problem: { type: String, required: true },
    customer: { type: String, required: true },
    market: { type: String, required: true },
    competitor: {
      type: [competitorSchema],
      validate: {
        validator: (value) => value.length === 3,
        message: "Competitor list must contain exactly 3 competitors",
      },
    },
    tech_stack: {
      type: [String],
      validate: {
        validator: (value) => value.length >= 4 && value.length <= 6,
        message: "Tech stack must contain 4 to 6 technologies",
      },
    },
    risk_level: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    profitability_score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    justification: { type: String, required: true },
  },
  { _id: false },
);

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    analysis: { type: analysisSchema, required: true },
  },
  { timestamps: true },
);

export const Idea = mongoose.model("Idea", ideaSchema);
