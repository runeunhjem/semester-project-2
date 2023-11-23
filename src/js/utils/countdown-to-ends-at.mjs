export function startCountdown(endDate) {
  const end = new Date(endDate);

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = end - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("countdown").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the countdown is finished, write some text
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);
}

// // Start the countdown
// startCountdown("Dec 31, 2023 23:59:59");
