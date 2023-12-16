export function displayMessage(parent, messageType, message) {
  const container = document.querySelector(parent);

  container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;
}
