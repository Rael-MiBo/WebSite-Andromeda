import Button from "../../components/button/Button";
import { useAuth } from "../../pages/hooks/useAuth";
import { useEconomy } from "../../pages/hooks/useEconomy";

export default function Resgatar() {
  const { user, isAuthenticated, login } = useAuth();

  const {
    balance,
    canClaimDaily,
    betAmount,
    gameMessage,
    setBetAmount,
    handleDailyReward,
    handleBet,
  } = useEconomy(user);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-light">Central de Resgate</h1>
        <p className="lead text-secondary d-flex justify-content-center align-items-center gap-2">
          {isAuthenticated ? (
            <>
              <img
                src={user?.avatar}
                alt="avatar"
                className="rounded-circle"
                width="30"
                height="30"
              />
              <span>
                <strong>{user?.username}</strong>, Bem-vindo de volta!
              </span>
            </>
          ) : (
            "Faça login para gerenciar seus coins."
          )}
        </p>
      </div>

      {!isAuthenticated ? (
        <div className="row justify-content-center animate__animated animate__fadeIn">
          <div className="col-lg-6">
            <div className="card bg-dark border-danger shadow-lg">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i className="bi bi-lock-fill display-1 text-danger opacity-75"></i>
                </div>
                <h3 className="text-white mb-3">Acesso Restrito</h3>
                <p className="text-secondary mb-4">
                  Você precisa estar autenticado com sua conta do Discord para
                  acessar sua carteira.
                </p>

                <div className="d-grid gap-3">
                  <Button
                    onClick={login}
                    variant="primary"
                    className="btn-lg fw-bold"
                  >
                    <i className="bi bi-discord me-2"></i>
                    Entrar com Discord
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn">
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center bg-dark border border-warning rounded-pill px-4 py-2 shadow">
              <i className="bi bi-coin text-warning fs-3 me-2"></i>
              <span className="fs-3 fw-bold text-white">{balance} Coins</span>
            </div>
          </div>

          {gameMessage && (
            <div className="alert alert-info text-center fw-bold mb-4 border-info bg-dark text-info">
              {gameMessage}
            </div>
          )}

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 bg-dark border-secondary shadow">
                <div className="card-header border-secondary fw-bold text-white d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-calendar-check me-2 text-success"></i>{" "}
                    Recompensa Diária
                  </span>
                  {canClaimDaily && (
                    <span className="badge bg-success rounded-pill">
                      Disponível
                    </span>
                  )}
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <p className="text-secondary">
                    Ganhe entre <strong className="text-white">50</strong> e{" "}
                    <strong className="text-white">200</strong> coins!
                  </p>
                  {canClaimDaily ? (
                    <Button
                      variant="success"
                      className="btn-lg w-100"
                      onClick={handleDailyReward}
                    >
                      Resgatar Agora
                    </Button>
                  ) : (
                    <button className="btn btn-secondary btn-lg w-100" disabled>
                      <i className="bi bi-check-circle me-2"></i>
                      Já coletado hoje
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 bg-dark border-secondary shadow">
                <div className="card-header border-secondary fw-bold text-white">
                  <i className="bi bi-dice-5 me-2 text-danger"></i> Cara ou
                  Coroa
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="text-secondary form-label small">
                      Valor da Aposta
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-black border-secondary text-warning">
                        <i className="bi bi-coin"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control bg-black text-white border-secondary"
                        placeholder="Min: 1"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <Button
                        variant="outline-light"
                        className="w-100 py-3"
                        onClick={() => handleBet("cara")}
                      >
                        CARA
                      </Button>
                    </div>
                    <div className="col-6">
                      <Button
                        variant="outline-light"
                        className="w-100 py-3"
                        onClick={() => handleBet("coroa")}
                      >
                        COROA
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
