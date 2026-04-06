import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIdea } from "../services/api";

const initialState = {
  title: "",
  description: "",
};

export function SubmitIdeaPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      const created = await createIdea(form);
      navigate(`/ideas/${created._id}`);
    } catch (err) {
      const message =
        err?.response?.data?.issues?.[0]?.message || "Failed to analyze idea.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-wrap reveal">
      <div className="section-head">
        <h2>Submit New Idea</h2>
        <p className="muted">
          Describe the startup clearly so the AI can produce a realistic report.
        </p>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Ex: AI assistant for neighborhood pharmacies"
          minLength={3}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Explain who the product serves, what problem it solves, and how it works."
          minLength={20}
          rows={7}
          required
        />

        {error && <p className="status error">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Analyzing..." : "Validate Idea"}
        </button>
      </form>
    </section>
  );
}
