export function updateCountdownDisplay(
  endsAt,
  countdownElement,
  countdownInterval,
  listingId
) {
  const endsAtDate = new Date(endsAt);
  const now = new Date();
  const timeLeft = endsAtDate - now;

  if (timeLeft <= 0) {
    const cardElement = document.querySelector(`[data-post-id="${listingId}"]`);
    if (cardElement) {
      const bidButton = cardElement.querySelector(".place-bid");
      if (!bidButton) {
        return;
      }

      bidButton.classList.add("d-none");
      const card = cardElement.querySelector(".card");
      card.classList.add("shadow-danger");
    }

    countdownElement.textContent = "Auction ended";
    countdownElement.className =
      "countdown-display bg-warning rounded shadow-sm fw-bold py-2";

    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  countdownElement.textContent = `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  countdownElement.className =
    "countdown-display bg-warning rounded shadow-sm fw-bold py-2";
}

const listingCards = document.querySelectorAll(".listing-card");
listingCards.forEach(card => {
  const listingId = card.getAttribute("data-post-id");
  const countdownElement = card.querySelector(
    ".your-countdown-element-selector"
  );
  const endsAt = card.getAttribute("data-post-endsAt");
  const countdownInterval = card.getAttribute("data-countdown-interval");

  updateCountdownDisplay(
    endsAt,
    countdownElement,
    countdownInterval,
    listingId
  );
});
