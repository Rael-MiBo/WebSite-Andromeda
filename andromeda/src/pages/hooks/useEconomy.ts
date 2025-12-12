import { useState, useEffect } from "react";

interface DiscordUser {
  id: string;
  username: string;
}

export function useEconomy(user: DiscordUser | null) {
  const [balance, setBalance] = useState(0);
  const [canClaimDaily, setCanClaimDaily] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [gameMessage, setGameMessage] = useState("");

  const balanceKey = user ? `economy_${user.id}_balance` : "";
  const dailyKey = user ? `economy_${user.id}_last_claim` : "";

  useEffect(() => {
    if (!user) {
      setBalance(0);
      setCanClaimDaily(false);
      setGameMessage("");
      return;
    }

    const savedBalance = localStorage.getItem(balanceKey);
    setBalance(savedBalance ? parseInt(savedBalance) : 0);

    const lastClaimDate = localStorage.getItem(dailyKey);
    const today = new Date().toDateString();
    
    if (!lastClaimDate || lastClaimDate !== today) {
      setCanClaimDaily(true);
    } else {
      setCanClaimDaily(false);
    }

  }, [user, balanceKey, dailyKey]);


  const handleDailyReward = () => {
    if (!user) return;

    const reward = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
    const newBalance = balance + reward;
    
    setBalance(newBalance);
    localStorage.setItem(balanceKey, newBalance.toString());

    localStorage.setItem(dailyKey, new Date().toDateString());
    setCanClaimDaily(false);

    setGameMessage(`🎉 Você ganhou ${reward} coins no prêmio diário!`);
  };

  const handleBet = (choice: "cara" | "coroa") => {
    if (!user) return;

    const value = parseInt(betAmount);

    if (!value || value <= 0) {
      setGameMessage("⚠️ Digite um valor válido.");
      return;
    }
    if (value > balance) {
      setGameMessage("🚫 Saldo insuficiente!");
      return;
    }

    const result = Math.random() < 0.5 ? "cara" : "coroa";
    
    if (choice === result) {
      const newBalance = balance + value;
      setBalance(newBalance);
      localStorage.setItem(balanceKey, newBalance.toString());
      setGameMessage(`🔥 DEU ${result.toUpperCase()}! Ganhou +${value} coins!`);
    } else {
      const newBalance = balance - value;
      setBalance(newBalance);
      localStorage.setItem(balanceKey, newBalance.toString());
      setGameMessage(`📉 Deu ${result.toUpperCase()}... Perdeu ${value} coins.`);
    }
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