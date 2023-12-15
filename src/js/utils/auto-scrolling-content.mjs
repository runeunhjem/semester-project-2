export function loopScroll(element, speed) {
  let startPos = 0;
  let scrollEnd = element.scrollWidth - element.clientWidth;
  let autoScrollActive = true;

  function step() {
    if (autoScrollActive) {
      if (startPos < scrollEnd) {
        element.scrollLeft = startPos;
        startPos += speed;
      } else {
        startPos = 0; // Reset to start
        element.scrollLeft = startPos;
        scrollEnd = element.scrollWidth - element.clientWidth; // Recalculate in case of dynamic content changes
      }
    }
    requestAnimationFrame(step);
  }

  // Event listeners to pause and resume scrolling
  element.addEventListener("mouseenter", () => {
    autoScrollActive = false;
  });

  element.addEventListener("mouseleave", () => {
    autoScrollActive = true;
  });

  // Update startPos on manual scroll
  element.addEventListener("scroll", () => {
    if (!autoScrollActive) {
      startPos = element.scrollLeft;
    }
  });

  requestAnimationFrame(step);
}
