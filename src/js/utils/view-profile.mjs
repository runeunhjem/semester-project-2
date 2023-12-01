import { listingsUrl } from "../api/apiUrls.mjs";

// Function to handle "View Profile" click
export function viewProfile() {
  // Fetch the currentProfileName from local storage
  const currentProfileName = localStorage.getItem("currentProfileName");
  console.log("Current Profile Name", currentProfileName);

  if (currentProfileName) {
    // Construct the URL for the profile's listings
    const url = `/src/html/profile/index.html?name=${currentProfileName}${listingsUrl}?_bids=true`;
    console.log("Profile URL", url);
    // Use the URL to navigate or fetch data
    // For example, you might want to navigate to this URL
    window.location.href = url;
  } else {
    console.log("No profile name found in local storage");
  }
}

// Add event listener to your "View Profile" link
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", event => {
    if (event.target.id === "viewProfileLink") {
      viewProfile();
    }
  });
});
