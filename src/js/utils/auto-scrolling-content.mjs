export function loopScroll(element, speed) {
  let startPos = 0;
  let scrollEnd = element.scrollWidth - element.clientWidth;
  let autoScrollActive = true;
  let scrollTimeout;

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

  function resumeAutoScroll() {
    if (!autoScrollActive) {
      autoScrollActive = true;
      startPos = element.scrollLeft;
    }
  }

  element.addEventListener("scroll", () => {
    autoScrollActive = false;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(resumeAutoScroll, 0); // Pause for 1 second before resuming
  });

  requestAnimationFrame(step);
}
