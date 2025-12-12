import Button from "../../components/button/Button";
import "./Home.css";

export default function Home() {
  const handleInvite = () => {
    window.open("https://discord.com/seu-link-de-convite", "_blank");
  };

  return (
    <div className="home-container">
      <section className="px-4 py-5 my-5 text-center hero-section">
        <div className="container">
          <div className="mb-4">
            <i className="bi bi-robot display-1 text-info floating-icon"></i>
          </div>
          <h1 className="display-2 fw-bold text-white mb-3">
            Transforme seu servidor com o{" "}
            <span className="text-gradient">Andrômeda</span>
          </h1>
          <div className="col-lg-8 mx-auto">
            <p className="lead text-secondary mb-4 fs-4">
              Música em alta qualidade, moderação avançada e diversão garantida.
              O bot multifuncional que faltava na sua comunidade.
            </p>

            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Button
                variant="primary"
                className="btn-lg px-4 gap-3 fw-bold rounded-pill"
                onClick={handleInvite}
              >
                <i className="bi bi-discord me-2"></i>
                Adicionar ao Discord
              </Button>

              <Button
                to="/comandos"
                variant="outline-light"
                className="btn-lg px-4 rounded-pill"
              >
                Ver Comandos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-5" id="features">
        <h2 className="pb-2 border-bottom border-secondary">
          Por que escolher o Andrômeda?
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col">
            <div className="feature-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-3 p-2">
                <i className="bi bi-music-note-beamed"></i>
              </div>
              <h3 className="fs-2 text-white">Música Hi-Fi</h3>
              <p className="text-secondary">
                Reprodução sem lag com suporte a Spotify, YouTube e SoundCloud.
                Crie playlists e controle o ritmo da festa.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-danger bg-gradient fs-2 mb-3 rounded-3 p-2">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3 className="fs-2 text-white">Moderação</h3>
              <p className="text-secondary">
                Mantenha a ordem com comandos de ban, kick e mute automatizados.
                Proteção contra spam e raids.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-2 mb-3 rounded-3 p-2">
                <i className="bi bi-controller"></i>
              </div>
              <h3 className="fs-2 text-white">Diversão</h3>
              <p className="text-secondary">
                Minigames, sistema de níveis, economia e comandos de interação
                para manter os membros ativos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
