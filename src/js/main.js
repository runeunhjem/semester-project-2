import { toTopButton } from "./utils/back-to-top-button.mjs";
import { attachLogoutEvent } from "./logout.js";
import { applyBootstrapValidation } from "./utils/validation.mjs";
import { toggleSearchSection } from "./utils/togglemobilesearch.mjs";
import { updateProfileDisplay } from "./make-html/profile-info.mjs";
import { displayLatestListings } from "./utils/create-latest-listings.mjs";
import { initializeAllCarousels } from "./utils/initialize-carousel.mjs";
import { displayListingDetails } from "./utils/create-listing-details.mjs";
import { displayAllListings } from "./utils/create-all-listings.mjs";
import {
  isLoggedIn,
  favoritesLink,
  loggedInUser,
} from "./variables/constants.mjs";
import { createNewListingForm } from "./make-html/create-new-listing.mjs";
import { displayProfileListings } from "./utils/create-profile-listings.mjs";
import { currentProfile } from "./make-html/profile-page.mjs";
import { currentProfileHistory } from "./make-html/profile-history-section.mjs";
import { loadFavorites } from "./make-html/create-favorites.mjs";
import { displayEndsSoonListings } from "./utils/create-ends-soon-listings.mjs";
import { initializeSearch } from "./utils/search-main.mjs";

const loggedInUserProfileLink = document.querySelectorAll(".menu-profile a");
loggedInUserProfileLink.forEach(profile => {
  profile.href = `/src/html/profile/index.html?profile=${loggedInUser}`;
});

if (isLoggedIn) {
  const hideLoginLinks = document.querySelectorAll(".menu-login");
  hideLoginLinks.forEach(link => {
    link.classList.add("d-none");
  });
  // Select all elements with the class 'restricted'
  const restrictedElements = document.querySelectorAll(".restricted");
  restrictedElements.forEach(element => {
    element.classList.remove("restricted");
  });
}

/**
 * Toggle the search section on mobile.
 * Update the header profile info depending on if user is logged in.
 * Apply Bootstrap validation to forms.
 * Display latest listings.
 * Initialize all carousels.
 */
// document.addEventListener("DOMContentLoaded", async () => { // NOT COMPATIBLE WITH IOS !!!
toggleSearchSection();
updateProfileDisplay();
applyBootstrapValidation();
initializeSearch();

if (
  !window.location.href.includes("login") ||
  !window.location.href.includes("profile") ||
  !window.location.href.includes("about") ||
  !window.location.href.includes("contact") ||
  !window.location.href.includes("listing")
) {
  await displayEndsSoonListings();
  await displayLatestListings();
  await displayAllListings();

  setTimeout(() => {
    // Wait for images to load
    initializeAllCarousels();
  }, 4000);
}
// });

if (window.location.href.includes("profile")) {
  await displayProfileListings();
  await currentProfile();
  await currentProfileHistory();

  setTimeout(() => {
    // Wait for images to load
    initializeAllCarousels();
  }, 2000);
}

if (window.location.href.includes("listing")) {
  await displayListingDetails();
  setTimeout(() => {
    // Wait for images to load
    initializeAllCarousels();
  }, 2000);
}

/**
 * Add a "Back to Top" button to the page.
 */
toTopButton();

/**
 * Attach logout event to logout links.
 */
attachLogoutEvent();

// Toggle Create New Listing
const addListingLink = document.querySelector(".icon-add-listing");
const addListingIcon = document.querySelector(".bi-plus-circle");
const createListingDiv = document.getElementById("create-new-listing");
const addListingText = document.querySelector(".add-listing");

if (addListingLink && createListingDiv) {
  addListingLink.addEventListener("click", event => {
    if (!loggedInUser) {
      console.log("User is not logged in.");
      window.location.href = "/login.html";
    }
    event.preventDefault(); // Prevent default link behavior
    // Toggle the 'd-none' class on the createListingDiv
    if (createListingDiv.classList.contains("d-none")) {
      createListingDiv.classList.remove("d-none");
      addListingIcon.classList.remove("bi-plus-circle");
      addListingIcon.classList.add("bi-arrow-up-circle");
      addListingText.textContent = "Hide Form";
      addListingText.classList.add("text-danger");
      createNewListingForm("formContainer"); // Call this only when showing the form
    } else {
      createListingDiv.classList.add("d-none");
      addListingIcon.classList.add("bi-plus-circle");
      addListingText.textContent = "Add Listing";
      addListingText.classList.remove("text-danger");
    }
  });
}

/**
 * Display favorites for the current logged in user.
 */
// Add click event listener
favoritesLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default anchor action
  if (!isLoggedIn) {
    window.location.href = "/login.html";
  } else {
    loadFavorites();
  }
});

// Select the element with the specific ID
const countdownDisplay = document.querySelector(".countdown-display");

// Check if the element exists and its text content includes 'auction ended'
if (
  countdownDisplay &&
  countdownDisplay.textContent.includes("Auction ended")
) {
  // Add the 'disabled' class to the element
  countdownDisplay.classList.add("bg-warning", "disabled");
  // const bidButton = document.querySelector(".place-bid");
  // bidButton.disabled = true;
  // console.log("Auction ended");
}
