import { useEffect, useState } from "react";
import getTimeRemaining from "@/utils/getTimeRemaining";

export const useCountdown = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!endDate) return;
    let interval: NodeJS.Timeout;
    const update = () => {
      const remaining = getTimeRemaining(endDate);
      setTimeLeft(remaining);
      if (remaining === "Time's up" && interval) {
        clearInterval(interval);
      }
    };

    update(); // Set initial value

    interval = setInterval(update, 1000); // Update every second

    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
};
