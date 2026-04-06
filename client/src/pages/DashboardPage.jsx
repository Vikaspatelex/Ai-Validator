import { useEffect, useState } from "react";
import { fetchIdeas, deleteIdeaById } from "../services/api";
import { IdeaCard } from "../components/IdeaCard";

export function DashboardPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadIdeas() {
    try {
      setLoading(true);
      const data = await fetchIdeas();
      setIdeas(data);
      setError("");
    } catch {
      setError("Failed to load ideas. Check backend availability.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteIdeaById(id);
      setIdeas((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setError("Could not delete idea.");
    }
  }

  useEffect(() => {
    loadIdeas();
  }, []);

  return (
    <section>
      <div className="section-head">
        <h2>Stored Ideas</h2>
        <p className="muted">
          Open any card to see the full AI validation report.
        </p>
      </div>
      {loading && <p className="status">Loading ideas...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !ideas.length && (
        <p className="status">No ideas yet. Submit one to get started.</p>
      )}
      <div className="idea-grid">
        {ideas.map((idea, index) => (
          <div key={idea._id} style={{ animationDelay: `${index * 80}ms` }}>
            <IdeaCard idea={idea} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </section>
  );
}
