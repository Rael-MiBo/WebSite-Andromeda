import { useState, useEffect } from "react";

interface Command {
  id: string;
  name: string;
  desc: string;
  category: string;
  usage: string;
}

export default function Comandos() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/commands")
      .then((response) => response.json())
      .then((data) => {
        setCommands(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar comandos:", error);
        setLoading(false);
      });
  }, []);

  const filteredCommands = commands.filter((cmd) => {
    const term = searchTerm.toLowerCase();
    return (
      cmd.name.toLowerCase().includes(term) ||
      cmd.desc.toLowerCase().includes(term) ||
      cmd.category.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return <div className="text-center text-white mt-5">Carregando comandos...</div>;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-white fw-bold">Comandos do Bot</h1>
        <p className="text-secondary">Explore tudo o que a Andromeda pode fazer</p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8 col-lg-6">
          <input
            type="text"
            className="form-control form-control-lg bg-dark text-white border-secondary"
            placeholder="🔍 Pesquisar comando (ex: música, ban, play...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="row g-4">
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd) => (
            <div key={cmd.id} className="col-md-6 col-lg-4">
              <div className="card h-100 bg-dark border-secondary shadow-sm hover-effect">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-info fw-bold font-monospace">{cmd.name}</h5>
                    <span className="badge bg-secondary">{cmd.category}</span>
                  </div>
                  <p className="card-text text-light opacity-75">{cmd.desc}</p>
                  
                  <div className="mt-3 p-2 bg-black bg-opacity-25 rounded border border-secondary border-opacity-25">
                      <small className="text-secondary d-block mb-1 text-uppercase" style={{fontSize: '0.7rem'}}>Uso:</small>
                      <code className="text-warning">{cmd.usage}</code>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-secondary mt-5">
            <h4>😕 Nenhum comando encontrado.</h4>
            <p>Tente buscar por outra palavra-chave.</p>
          </div>
        )}
      </div>
    </div>
  );
}