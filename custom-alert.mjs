export function displayMessage(parent, messageType, message) {
  const container = document.querySelector(parent);

  container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;
}

// import { displayMessage } from "./utils/custom-alert.mjs";
// displayMessage("#posts", "bg-danger", error.message);
// displayMessage("#posts", "bg-success", "Successfully loaded posts");
// displayMessage("#posts", "bg-warning", "No posts found");
// Check later if this is needed
