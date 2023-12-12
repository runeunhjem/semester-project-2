export function highlightQuery(text, query) {
  if (!query) return text; // Return the original text if query is null or undefined
  if (!text) return ""; // Return an empty string if text is null or undefined
  const highlightedText = text.replace(
    new RegExp(query, "gi"),
    match => `<span class="highlight">${match}</span>`
  );
  return highlightedText;
}
