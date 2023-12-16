import { API_BASE_URL, loginUrl } from "./api/apiurls.mjs";
import { preFillFormFields, loginUser } from "./utils/login.mjs";

/**
 * Get the login form element and pre-fill its fields if data is available.
 */
const loginForm = document.getElementById("login-form");
preFillFormFields();

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  loginForm.classList.add("was-validated");

  try {
    const formData = new FormData(loginForm);
    const formDataObject = Object.fromEntries(formData.entries());

    const loginURL = `${API_BASE_URL}${loginUrl}`;

    /**
     * Attempt to log in the user using the provided form data.
     */
    await loginUser(loginURL, formDataObject);
  } catch (error) {
    console.error(error);
  }
});
