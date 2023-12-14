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
    // Use the listing ID to select the specific card
    const cardElement = document.querySelector(`[data-post-id="${listingId}"]`);
    console.log("Listing ID:", listingId);
    console.log("Card Element:", cardElement);
    if (cardElement) {
      const card = cardElement.querySelector(".card");
      card.classList.add("shadow-danger");
    }

    countdownElement.textContent = "Auction ended";
    countdownElement.className =
      "countdown-display bg-warning rounded shadow-sm fw-bold py-2";

    // Update the bid button inside the specific card
    const bidButton = cardElement.querySelector(".place-bid");
    if (bidButton) {
      bidButton.classList.add("d-none");
    }

    clearInterval(countdownInterval); // Stop the interval
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

// Iterate over each listing card
const listingCards = document.querySelectorAll(".listing-card");
listingCards.forEach(card => {
  // Extract the listing ID and other necessary data from the card
  const listingId = card.getAttribute("data-post-id");
  const countdownElement = card.querySelector(
    ".your-countdown-element-selector"
  ); // Update selector as needed
  const endsAt = card.getAttribute("data-post-endsAt"); // Determine how you get the endsAt value
  const countdownInterval = card.getAttribute("data-countdown-interval"); // Determine how you set the countdownInterval

  // Call the updateCountdownDisplay function for each card
  updateCountdownDisplay(
    endsAt,
    countdownElement,
    countdownInterval,
    listingId
  );
});
