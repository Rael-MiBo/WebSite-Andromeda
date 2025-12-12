import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("discordUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = () => {
    setIsLoading(true);

    // window.location.href = "https://discord.com/oauth2/authorize?client_id=1070401576591708242&response_type=code&redirect_uri=localhost%3A5173%2F&scope=identify";
    
    setTimeout(() => {
      const mockUser = {
        name: "Viajante Estelar",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
      };
      
      localStorage.setItem("discordUser", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoading(false);
      

      window.location.href = "/resgatar"; 
      alert("Login realizado com sucesso! (Simulação)");
    }, 1500);
  };

  const logout = () => {
    localStorage.removeItem("discordUser");
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
}