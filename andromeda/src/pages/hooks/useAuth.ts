import { useState, useEffect, useRef } from "react";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

export function useAuth() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const CLIENT_ID = "1070401576591708242"; 
  const REDIRECT_URI = "http://localhost:5173/autenticacao";
  
  const didRun = useRef(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("discordUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
      return;
    }

    const hash = window.location.hash;
    console.log("--- DEBUG START ---");
    console.log("📍 URL Atual:", window.location.href);
    console.log("📍 Hash detectado:", hash);

    if (!hash) {
      console.log("❌ Nenhum hash encontrado na URL. O Discord não retornou o token ou a URL já foi limpa.");
      setIsLoading(false);
      return;
    }

    if (didRun.current) {
      console.log("⚠️ useEffect já rodou uma vez. Ignorando execução duplicada.");
      return;
    }
    didRun.current = true;

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const tokenType = params.get("token_type");

    if (accessToken) {
      console.log("✅ Token encontrado!", accessToken.substring(0, 10) + "...");
      
      window.history.replaceState({}, document.title, "/"); 

      fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      })
      .then(async (res) => {
        if (!res.ok) {
           const err = await res.text();
           throw new Error("Erro na API: " + err);
        }
        return res.json();
      })
      .then((data) => {
        console.log("🎉 DADOS RECEBIDOS:", data);
        
        const formattedUser = {
            id: data.id,
            username: data.username,
            avatar: data.avatar 
              ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
              : "https://cdn.discordapp.com/embed/avatars/0.png",
            discriminator: data.discriminator
        };

        console.log("💾 Salvando no LocalStorage...");
        localStorage.setItem("discordUser", JSON.stringify(formattedUser));
        
        setUser(formattedUser);
        
        window.dispatchEvent(new Event("storage"));
      })
      .catch((err) => {
        console.error("🔥 ERRO FATAL:", err);
        alert("Erro no login.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const login = () => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify&prompt=consent`;
    window.location.href = authUrl;
  };

  const logout = () => {
    localStorage.removeItem("discordUser");
    setUser(null);
    window.location.reload();
  };

  return { user, isLoading, isAuthenticated: !!user, login, logout };
}