import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success" | "outline-light" | "outline-dark";
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({ 
  children, 
  variant = "primary", 
  to, 
  onClick, 
  className = "", 
  type = "button" 
}: ButtonProps) {
  
  const baseClasses = `btn btn-${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );
}