import { Link } from "react-router-dom";

export function IdeaCard({ idea, onDelete }) {
  return (
    <article className="idea-card reveal">
      <div className="card-header">
        <h3>{idea.title}</h3>
        <span
          className={`risk-pill ${idea.analysis?.risk_level?.toLowerCase() || "medium"}`}
        >
          {idea.analysis?.risk_level || "Unknown"} risk
        </span>
      </div>
      <p className="muted">{idea.description}</p>
      <div className="card-footer">
        <p className="score">
          Profitability: {idea.analysis?.profitability_score ?? "-"}/100
        </p>
        <div className="actions">
          <Link className="btn btn-secondary" to={`/ideas/${idea._id}`}>
            View Report
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(idea._id)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
