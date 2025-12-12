import "./nav.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

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
          <ul className="navbar-nav ms-auto align-items-center">
            
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

            {user && (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center bg-black bg-opacity-25 px-3 py-1 rounded-pill border border-secondary border-opacity-25">
                <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                />
                <span className="text-white small fw-bold">
                    {user.username}
                </span>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}