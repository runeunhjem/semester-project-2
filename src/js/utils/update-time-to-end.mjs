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
    countdownElement.textContent = "Auction ended";
    countdownElement.className =
      "countdown-display bg-warning rounded shadow-sm fw-bold py-2";

    // Find and update the parent card element
    const cardElement = countdownElement.closest('.card');
    if (cardElement) {
      cardElement.classList.add("shadow-danger");
    }

    // Remove the Place Bid button
    const bidButton = document.querySelector(".place-bid");
    if (bidButton) {
      bidButton.remove();
    }

    // Change leader to winner
    const leaderElement = document.getElementById("current-leader");
    if (leaderElement) {
      leaderElement.textContent = "Winner:";
    }
    const winningBid = document.getElementById("winning-bid");
    if (winningBid) {
      winningBid.textContent = "Winning Bid:";
    }

    clearInterval(countdownInterval);
  } else {
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
}

document.addEventListener("DOMContentLoaded", () => {
  const listingCards = document.querySelectorAll(".listing-card");

  listingCards.forEach(card => {
    const listingId = card.getAttribute("data-post-id");
    const countdownElement = card.querySelector(".countdown-display");
    const endsAt = card.getAttribute("data-post-endsAt");

    // Initialize and store the countdown interval for each card
    const countdownInterval = setInterval(() => {
      updateCountdownDisplay(
        endsAt,
        countdownElement,
        countdownInterval,
        listingId
      );
    }, 1000);

    card.setAttribute("data-countdown-interval", countdownInterval);
  });
});
