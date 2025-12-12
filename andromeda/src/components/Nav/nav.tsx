import "./nav.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="./">
          <span className="text-gradient">
            <i className="bi bi-stars"></i>
            Andrômeda
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/autenticacao">
                Autenticação
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comandos">
                Comandos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resgatar">
                Resgatar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doar">
                Doar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
