import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(utc);

/**
 * Calculates how much time has passed since the given start date.
 * Returns a human-readable string like "2 days ago", "3 hours ago", etc.
 * @param startDate ISO string or valid date
 * @returns string - e.g. "3 min ago", "2 h ago", "5 d ago"
 */
const getTimeAgo = (startDate: string | Date): string => {
  const now = dayjs.utc();
  const start = dayjs.utc(startDate);
  const diffMs = now.diff(start);

  if (diffMs <= 0) return "just now";

  const diff = dayjs.duration(diffMs);

  if (diff.asDays() >= 1) return `${Math.floor(diff.asDays())} d ago`;
  if (diff.asHours() >= 1) return `${Math.floor(diff.asHours())} h ago`;
  if (diff.asMinutes() >= 1) return `${Math.floor(diff.asMinutes())} min ago`;
  return `${Math.floor(diff.asSeconds())} sec ago`;
};

export default getTimeAgo;
