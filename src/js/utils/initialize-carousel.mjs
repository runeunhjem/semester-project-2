export async function initializeAllCarousels() {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach(carousel => {
    // eslint-disable-next-line no-undef
    new bootstrap.Carousel(carousel, {
      interval: 2000, // Adjust as needed
      ride: "carousel",
    });
  });
}
