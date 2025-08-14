import { useEffect, useState } from "react";
import getTimeRemaining from "@/utils/getTimeRemaining";

export const useCountdown = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!endDate) return;

    const update = () => {
      const remaining = getTimeRemaining(endDate);
      setTimeLeft(remaining);
      if (remaining === "Time's up") {
        clearInterval(interval);
      }
    };

    const interval = setInterval(update, 1000);
    update();

    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
};
