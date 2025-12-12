interface CommandCardProps {
  name: string;
  desc: string;
  category: string;
  usage: string;
}

export default function CommandCard({ name, desc, category, usage }: CommandCardProps) {
  
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Música": return "text-bg-primary";
      case "Moderação": return "text-bg-danger";
      case "Utilidade": return "text-bg-success";
      default: return "text-bg-secondary";
    }
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 bg-dark border-secondary text-light shadow-sm cmd-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h3 className="card-title h4 text-info fw-bold">{name}</h3>
            <span className={`badge rounded-pill ${getBadgeColor(category)}`}>
              {category}
            </span>
          </div>
          <p className="card-text text-secondary">{desc}</p>
          <div className="mt-3 p-2 bg-black rounded border border-secondary border-opacity-25">
            <code className="text-warning small">{usage}</code>
          </div>
        </div>
      </div>
    </div>
  );
}