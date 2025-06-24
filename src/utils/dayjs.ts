/**
 * Calculates the number of days left until a given end date.
 * @param endDate - The end date string (ISO format or any valid date string)
 * @returns Number of days left; returns 0 if date has passed
 */
const daysLeft = (endDate: string): number => {
  const today = new Date();
  const end = new Date(endDate);

  // Normalize both dates to midnight to ignore time-of-day differences
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diff = end.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return Math.max(days, 0);
};

export default daysLeft;
