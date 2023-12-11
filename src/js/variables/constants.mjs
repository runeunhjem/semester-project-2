export const loggedInUser = localStorage.getItem("loggedInUser");
export const currentProfileName = localStorage.getItem("currentProfileName");
export const accessToken = localStorage.getItem("accessToken");
export const isLoggedIn = localStorage.getItem("isLoggedIn");
export const favoritesLink = document.querySelector(".icon-favorites");
export const globalLimit = 100;
export const globalMaxTotalListings = 100;

export const pastelColors = [
  "#fbb4ae", // pastel pink
  "#b3cde3", // pastel blue
  "#ccebc5", // pastel green
  "#decbe4", // pastel purple
  "#fed9a6", // pastel orange
  "#ffffcc", // pastel yellow
  "#e5d8bd", // pastel brown
  "#fddaec", // pastel magenta
  "#f2f2f2", // pastel grey
  "#b3e2cd", // pastel teal
  "#fdcdac", // pastel coral
  "#cbd5e8", // pastel lavender
  "#f4cae4", // pastel pink
  "#e6f5c9", // pastel lime
  "#fff2ae", // pastel banana
  "#f1e2cc", // pastel tan
  "#cccccc", // pastel grey
];

// List of Picsum Photo-IDs to exclude
export const excludedIds = [
  205, 207, 224, 226, 245, 246, 262, 285, 286, 298, 303, 332, 333, 346, 359,
  394, 414, 422, 438, 462, 463, 470, 489,
];
