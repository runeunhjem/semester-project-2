function getDaySuffix(day) {
  if (day > 3 && day < 21) return "th"; // for numbers like 4th, 13th, or 19th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function convertToShortDateFormat(dateString) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthIndex = date.getMonth(); // Months are 0-indexed
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const monthName = monthNames[monthIndex];
  const daySuffix = getDaySuffix(day);

  return `${year}, ${monthName} ${day}${daySuffix} @ ${hours}:${minutes}`;
}
