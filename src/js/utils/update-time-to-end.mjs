export function updateCountdownDisplay(
  endsAt,
  countdownElement,
  countdownInterval
) {
  const endsAtDate = new Date(endsAt);
  const now = new Date();
  const timeLeft = endsAtDate - now;

  if (timeLeft <= 0) {
    countdownElement.textContent = "Auction ended";
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