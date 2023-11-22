export function attachLogoutEvent() {
  const logoutLinks = document.querySelectorAll(".logout-link");
  logoutLinks.forEach(function (logoutLink) {
    logoutLink.addEventListener("click", function (logout) {
      logout.preventDefault();
      localStorage.clear();

      window.location.href = "/login.html";
    });
  });
}
