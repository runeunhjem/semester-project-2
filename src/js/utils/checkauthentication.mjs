export function checkAuthentication() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // Redirect to login page if accessToken is not found
    window.location.href = "/login.html";
  }
}
