import { useState } from "react";

// Dados simulados (alterar para buscar de uma API real)
const commandsData = [
  { id: 1, name: "/play", desc: "Toca uma música do YouTube ou Spotify", category: "Música", usage: "/play <link ou nome>" },
  { id: 2, name: "/stop", desc: "Para a música e desconecta o bot", category: "Música", usage: "/stop" },
  { id: 3, name: "/ban", desc: "Bane um usuário do servidor", category: "Moderação", usage: "/ban @usuario [motivo]" },
  { id: 4, name: "/clear", desc: "Limpa um número de mensagens", category: "Moderação", usage: "/clear <quantidade>" },
  { id: 5, name: "/ping", desc: "Mostra a latência do bot", category: "Utilidade", usage: "/ping" },
  { id: 6, name: "/avatar", desc: "Exibe o avatar de um usuário", category: "Utilidade", usage: "/avatar [@usuario]" },
  { id: 7, name: "/skip", desc: "Pula para a próxima música", category: "Música", usage: "/skip" },
  { id: 8, name: "/help", desc: "Mostra a lista de comandos", category: "Utilidade", usage: "/help" },
];

export default function Comandos() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommands = commandsData.filter((cmd) =>
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Música": return "text-bg-primary";
      case "Moderação": return "text-bg-danger";
      case "Utilidade": return "text-bg-success";
      default: return "text-bg-secondary";
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-light mb-3">Comandos do Andrômeda</h1>
        <p className="lead text-secondary mb-4">
          Explore todas as funcionalidades disponíveis para o seu servidor.
        </p>
        
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-dark border-secondary text-light">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark border-secondary text-light"
                placeholder="Pesquisar comando (ex: play, ban)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd) => (
            <div key={cmd.id} className="col-md-6 col-lg-4">
              <div className="card h-100 bg-dark border-secondary text-light shadow-sm cmd-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="card-title h4 text-info fw-bold">{cmd.name}</h3>
                    <span className={`badge rounded-pill ${getBadgeColor(cmd.category)}`}>
                      {cmd.category}
                    </span>
                  </div>
                  <p className="card-text text-secondary">{cmd.desc}</p>
                  <div className="mt-3 p-2 bg-black rounded border border-secondary border-opacity-25">
                    <code className="text-warning small">{cmd.usage}</code>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-secondary mt-5">
            <i className="bi bi-emoji-frown fs-1"></i>
            <p className="mt-3">Nenhum comando encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}