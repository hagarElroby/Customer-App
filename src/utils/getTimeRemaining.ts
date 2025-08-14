import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(utc);

export const getTimeRemaining = (endDate: string): string => {
  const now = dayjs.utc().toISOString();
  const end = dayjs.utc(endDate);

  const diffMs = end.diff(now);

  if (diffMs <= 0) return "Time's up";

  const dur = dayjs.duration(diffMs);

  const days = Math.floor(dur.asDays());
  const hours = dur.hours();
  const minutes = dur.minutes();
  const seconds = dur.seconds();

  if (days > 1) return `${days} days`;
  if (days === 1) return `${days} day ${hours} hours`;
  if (hours >= 1) return `${hours} hours ${minutes} minutes`;
  if (minutes >= 1) return `${minutes} minutes ${seconds} seconds`;
  return `${seconds} seconds`;
};

export default getTimeRemaining;
