import { useState, useEffect } from "react";

interface DiscordUser {
  id: string;
  username: string;
}

export function useEconomy(user: DiscordUser | null) {
  const [balance, setBalance] = useState(0);
  const [canClaimDaily, setCanClaimDaily] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const API_URL = "http://localhost:3001/users";

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_URL}/${user.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
        
        const today = new Date().toDateString();
        setCanClaimDaily(data.lastClaimDate !== today);
      } else {
        const newUser = {
          id: user.id,
          username: user.username,
          balance: 0,
          lastClaimDate: ""
        };
        
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser)
        });
        
        setBalance(0);
        setCanClaimDaily(true);
      }
    } catch (error) {
      console.error("Erro ao conectar com API:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const updateDatabase = async (newBalance: number, newDate?: string) => {
    if (!user) return;

    setBalance(newBalance);
    if (newDate) setCanClaimDaily(false);

    await fetch(`${API_URL}/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        balance: newBalance,
        ...(newDate && { lastClaimDate: newDate })
      })
    });
  };

  const handleDailyReward = async () => {
    const reward = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
    const newBalance = balance + reward;
    const today = new Date().toDateString();

    setGameMessage(`🎉 Você ganhou ${reward} coins no prêmio diário!`);
    await updateDatabase(newBalance, today);
  };

  const handleBet = async (choice: "cara" | "coroa") => {
    const value = parseInt(betAmount);
    if (!value || value <= 0 || value > balance) {
      setGameMessage("🚫 Aposta inválida.");
      return;
    }

    const result = Math.random() < 0.5 ? "cara" : "coroa";
    let newBalance = balance;

    if (choice === result) {
      newBalance += value;
      setGameMessage(`🔥 DEU ${result.toUpperCase()}! Ganhou +${value} coins!`);
    } else {
      newBalance -= value;
      setGameMessage(`📉 Deu ${result.toUpperCase()}... Perdeu ${value} coins.`);
    }

    await updateDatabase(newBalance);
  };

  return {
    balance,
    canClaimDaily,
    betAmount,
    gameMessage,
    setBetAmount,
    handleDailyReward,
    handleBet
  };
}