import { useState, useEffect } from "react";

export function useEconomy() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);
  const [canClaimDaily, setCanClaimDaily] = useState(true);
  const [betAmount, setBetAmount] = useState("");
  const [gameMessage, setGameMessage] = useState("");

  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance");
    const lastClaimDate = localStorage.getItem("lastClaimDate");

    if (savedBalance) setBalance(parseInt(savedBalance));

    if (lastClaimDate) {
      const today = new Date().toDateString();
      if (lastClaimDate === today) {
        setCanClaimDaily(false);
      }
    }
  }, []);
  
  const toggleLoginMock = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const handleDailyReward = () => {
    const reward = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
    
    const newBalance = balance + reward;
    setBalance(newBalance);
    localStorage.setItem("userBalance", newBalance.toString());

    localStorage.setItem("lastClaimDate", new Date().toDateString());
    setCanClaimDaily(false);

    setGameMessage(`🎉 Você ganhou ${reward} coins no prêmio diário!`);
  };

  const handleBet = (choice: "cara" | "coroa") => {
    const value = parseInt(betAmount);

    if (!value || value <= 0) {
      setGameMessage("⚠️ Digite um valor válido para apostar.");
      return;
    }
    if (value > balance) {
      setGameMessage("🚫 Você não tem saldo suficiente!");
      return;
    }

    const result = Math.random() < 0.5 ? "cara" : "coroa";
    
    if (choice === result) {
      const newBalance = balance + value;
      setBalance(newBalance);
      localStorage.setItem("userBalance", newBalance.toString());
      setGameMessage(`🔥 DEU ${result.toUpperCase()}! Você ganhou ${value} coins!`);
    } else {
      const newBalance = balance - value;
      setBalance(newBalance);
      localStorage.setItem("userBalance", newBalance.toString());
      setGameMessage(`📉 Deu ${result.toUpperCase()}... Você perdeu ${value} coins.`);
    }
  };

  return {
    balance,
    isLoggedIn,
    canClaimDaily,
    betAmount,
    gameMessage,
    setBetAmount, 
    toggleLoginMock,
    handleDailyReward,
    handleBet
  };
}