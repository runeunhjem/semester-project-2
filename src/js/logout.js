export function attachLogoutEvent() {
  const logoutLinks = document.querySelectorAll(".logout-link");

  logoutLinks.forEach(function (logoutLink) {
    logoutLink.addEventListener("click", function (logoutEvent) {
      logoutEvent.preventDefault();

      // Save favorites before clearing localStorage
      const favorites = localStorage.getItem("favorites");

      // Clear localStorage
      localStorage.clear();

      // Restore favorites to localStorage
      if (favorites) {
        localStorage.setItem("favorites", favorites);
      }

      // Redirect to login page
      window.location.href = "/login.html";
    });
  });
}
