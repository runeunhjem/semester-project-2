console.log("Register script loaded");
/**
 * Attempts to register a user using the provided user data.
 * @param {string} url - The URL where the registration request is sent.
 * @param {object} userData - The user data containing name, email, password, and optionally avatar.
 * @returns {Promise<object>} - A promise that resolves with the response data if the registration is successful.
 */
export async function registerUser(url, userData) {
  try {
    console.log("Entered registerUser function");
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    console.log("Registering user:...", userData);
    const response = await fetch(url, postData);
    console.log("Register response:", response);
    const json = await response.json();
    console.log("Register response: ", json);

    if (response.status >= 200 && response.status <= 299) {
      const registerButton = document.getElementById("registerButton");
      registerButton.classList.remove("btn-warning");
      registerButton.textContent = "Registration successful!";
      registerButton.classList.add("btn-success", "text-light", "fw-bold");
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 1200);
    } else {
      console.error("Registration failed!");
      alert("Registration failed! Please try again.");
    }
    return json;
  } catch (error) {
    console.error("Error: ", error);
  }
}
