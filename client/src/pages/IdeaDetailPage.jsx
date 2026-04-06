import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchIdeaById } from "../services/api";

export function IdeaDetailPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadIdea() {
      try {
        setLoading(true);
        const data = await fetchIdeaById(id);
        setIdea(data);
        setError("");
      } catch {
        setError("Failed to load idea report.");
      } finally {
        setLoading(false);
      }
    }

    loadIdea();
  }, [id]);

  if (loading) {
    return <p className="status">Loading report...</p>;
  }

  if (error || !idea) {
    return (
      <section>
        <p className="status error">{error || "Idea not found"}</p>
        <Link to="/" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </section>
    );
  }

  return (
    <section className="report reveal">
      <div className="report-header">
        <div>
          <p className="eyebrow">AI Validation Report</p>
          <h2>{idea.title}</h2>
          <p className="muted">{idea.description}</p>
        </div>
        <div className="score-block">
          <p>Profitability Score</p>
          <strong>{idea.analysis.profitability_score}/100</strong>
          <span
            className={`risk-pill ${idea.analysis.risk_level.toLowerCase()}`}
          >
            {idea.analysis.risk_level} risk
          </span>
        </div>
      </div>

      <div className="report-grid">
        <article>
          <h3>Problem Summary</h3>
          <p>{idea.analysis.problem}</p>
        </article>
        <article>
          <h3>Customer Persona</h3>
          <p>{idea.analysis.customer}</p>
        </article>
        <article>
          <h3>Market Overview</h3>
          <p>{idea.analysis.market}</p>
        </article>
        <article>
          <h3>Suggested Tech Stack</h3>
          <ul>
            {idea.analysis.tech_stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className="report-card">
        <h3>Competitor Snapshot</h3>
        <div className="competitor-grid">
          {idea.analysis.competitor.map((comp) => (
            <div key={comp.name} className="competitor-card">
              <h4>{comp.name}</h4>
              <p>{comp.differentiation}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="report-card">
        <h3>Justification</h3>
        <p>{idea.analysis.justification}</p>
      </article>

      <Link to="/" className="btn btn-secondary">
        Back to Dashboard
      </Link>
    </section>
  );
}
