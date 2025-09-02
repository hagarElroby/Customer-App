export function formatNotificationDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const sameYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const timeString = date.toLocaleTimeString([], options);

  if (sameDay) {
    return `Today at ${timeString}`;
  }

  if (sameYesterday) {
    return `Yesterday at ${timeString}`;
  }

  // If within the last 7 days
  if (date > oneWeekAgo) {
    // Get weekday name (e.g. "Wednesday")
    const weekday = date.toLocaleDateString([], { weekday: "long" });
    return `Last ${weekday} at ${timeString}`;
  }

  // If within the last month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);
  if (date > oneMonthAgo) {
    return `Last month at ${timeString}`;
  }

  // Otherwise → full date
  const day = date.getDate();
  const month = date.toLocaleDateString([], { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year} at ${timeString}`;
}
