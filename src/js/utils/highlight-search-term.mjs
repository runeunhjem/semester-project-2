/**
 * Highlights all occurrences of a specified query string within a given text.
 *
 * This function searches for all instances of the `query` string within the `text`
 * and wraps them in a `<span>` element with the class "highlight" for styling purposes.
 * The search is case-insensitive. If `query` is empty or `text` is not provided,
 * the function returns the original text or an empty string, respectively.
 *
 * @param {string} text - The text in which to search for the query.
 * @param {string} query - The query string to highlight within the text.
 * @returns {string} The text with all occurrences of the query highlighted.
 */
export function highlightQuery(text, query) {
  if (!query) return text;
  if (!text) return "";
  const highlightedText = text.replace(
    new RegExp(query, "gi"),
    match => `<span class="highlight">${match}</span>`
  );
  return highlightedText;
}
