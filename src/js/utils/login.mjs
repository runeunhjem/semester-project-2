/**
 * Fills out the login form fields with a saved email if "Remember Me" is enabled.
 */
export function preFillFormFields() {
  const savedEmail = localStorage.getItem("savedEmail");
  const rememberMe = localStorage.getItem("rememberMe");

  if (savedEmail) {
    document.getElementById("loginEmail").value = savedEmail;
  }

  if (rememberMe === "true") {
    document.getElementById("remember").checked = true;
  }
}

/**
 * Attempts to log in a user using the provided user data and saves relevant options to local storage.
 * @param {string} url - The URL where the login request is sent.
 * @param {object} userData - The user data containing email and password.
 * @returns {Promise<object>} - A promise that resolves with the response data if the login is successful.
 */
export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.status >= 200 && response.status <= 299) {
      // Needed for smooth sailing after login
      // const accessToken = json.accessToken;
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("loggedInUser", json.name);
      localStorage.setItem("currentProfileName", json.name);
      localStorage.setItem("URLProfilename", json.name);
      localStorage.setItem("isLoggedIn", true);

      if (document.getElementById("remember").checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedEmail", userData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
      }
      const loginButton = document.getElementById("login-button");
      loginButton.classList.remove("btn-warning");
      loginButton.textContent = "Success";
      loginButton.classList.add("btn-success", "text-light", "fw-bold");
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 300);
    } else {
      console.error("Login failed!");
      alert("Login failed! Check info and try later.");
    }
    return json;
  } catch (error) {
    console.error(error);
  }
}
