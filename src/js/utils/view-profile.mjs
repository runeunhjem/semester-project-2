import { listingsUrl } from "../api/apiUrls.mjs";
import { loggedInUser, currentProfileName } from "../variables/constants.mjs";

// Function to handle "View Profile" click
export function viewProfile() {
  if (loggedInUser && currentProfileName) {
    // Construct the URL for the profile's listings
    const url = `/src/html/profile/index.html?name=${currentProfileName}${listingsUrl}?_bids=true`;
    window.location.href = url;
  } else {
    console.log("No profile name found in local storage");
    window.location.href = "/login.html";
  }
}

// Add event listener to your "View Profile" link
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", event => {
    if (!loggedInUser) {
      return;
    } else if (event.target.id === "viewProfileLink") {
      viewProfile();
    }
  });
});
