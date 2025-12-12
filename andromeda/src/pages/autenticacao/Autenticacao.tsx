import Button from "../../components/button/Button";

export default function autenticacao() {
  return (
    <div className="home-container">
      <section className="px-4 py-5 my-5 text-center hero-section">
        <div className="container">
          <h1 className="display-2 fw-bold text-white mb-3">
            Conecte-se em sua conta e aproveite o{" "}
            <span className="text-gradient">Andrômeda</span>
          </h1>
          <div className="col-lg-8 mx-auto">
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Button
                variant="primary"
                className="btn-lg px-4 gap-3 fw-bold rounded-pill"
              >
                <i className="bi bi-discord me-2"></i>
                Autenticar com Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container px-4 py-5" id="features">
        <h2 className="pb-2 border-bottom border-secondary">
          Por que escolher se autenticar?
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col">
            <div className="feature-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-3 p-2">
                <i className="bi bi-award"></i>
              </div>
              <h3 className="fs-2 text-white">Resgatar pontuação</h3>
              <p className="text-secondary">
                Sincronize sua conta para resgatar pontos e recompensas
              </p>
            </div>
          </div>
          <div className="col">
            <div className="feature-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-danger bg-gradient fs-2 mb-3 rounded-3 p-2">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3 className="fs-2 text-white">Administração de servidores</h3>
              <p className="text-secondary">
                Gerencie configurações personalizadas para seus servidores diretamente do painel.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="feature-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-2 mb-3 rounded-3 p-2">
                <i className="bi bi-clipboard-check"></i>
              </div>
              <h3 className="fs-2 text-white">Agilidade</h3>
              <p className="text-secondary">
                Acesse rapidamente suas configurações e estatísticas sem complicações.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
