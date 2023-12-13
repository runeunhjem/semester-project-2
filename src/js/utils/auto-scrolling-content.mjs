export function loopScroll(element, speed) {
  const originalContent = element.innerHTML;
  element.innerHTML += originalContent;

  setTimeout(() => {
    let startPos = 0;
    const scrollEnd = element.scrollWidth / 2;
    let autoScrollActive = true;
    let scrollTimeout;

    function step() {
      // console.log("scrollLeft:", element.scrollLeft, "startPos:", startPos); // Debugging log
      if (autoScrollActive) {
        if (startPos < scrollEnd) {
          element.scrollLeft = startPos;
          startPos += speed; // Try increasing this value if the movement is too small
        } else {
          startPos = 0;
          element.scrollLeft = startPos;
        }
      }
      requestAnimationFrame(step);
    }

    function resumeAutoScroll() {
      if (!autoScrollActive) {
        autoScrollActive = true;
        startPos = element.scrollLeft; // Resume from current scroll position
      }
    }

    element.addEventListener("scroll", () => {
      autoScrollActive = false;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(resumeAutoScroll, 0);
    });

    requestAnimationFrame(step);
  }, 0);
}
