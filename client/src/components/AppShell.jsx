import { NavLink } from "react-router-dom";

export function AppShell({ children }) {
  return (
    <div className="app-bg">
      <header className="topbar">
        <div className="brand-wrap">
          <p className="eyebrow">AI MVP</p>
          <h1 className="brand">Startup Idea Validator</h1>
        </div>
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/submit"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Submit Idea
          </NavLink>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
