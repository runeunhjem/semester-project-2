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
import { loopScroll } from "./utils/auto-scrolling-content.mjs";

const loggedInUserProfileLink = document.querySelectorAll(".menu-profile a");

loggedInUserProfileLink.forEach(profile => {
  if (!loggedInUser) {
    // If loggedInUser is not defined, set the link to point to login page
    profile.href = "/login.html";
  } else {
    // If loggedInUser is defined, set the link to the profile page with the user's profile
    profile.href = `/src/html/profile/index.html?profile=${loggedInUser}`;
  }
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
  const unRestrictedElements = document.querySelectorAll(".unrestricted");
  unRestrictedElements.forEach(element => {
    element.classList.add("d-none");
  });
}

const closeIcons = document.querySelectorAll(".close-section");

closeIcons.forEach(icon => {
  icon.addEventListener("click", function () {
    const sectionToClose = this.closest(".section-container");
    if (sectionToClose) {
      sectionToClose.classList.add("d-none");
    }
  });
});

toggleSearchSection();
updateProfileDisplay();
applyBootstrapValidation();
initializeSearch();

document.addEventListener("DOMContentLoaded", async () => {
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
    // await autoScroll(element, speed);
    const elements = document.querySelectorAll(".categories-container");
    elements.forEach(el => loopScroll(el, 1));

    setTimeout(() => {
      // Wait for images to load
      initializeAllCarousels();
    }, 4000);
  }

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
  if (!loggedInUser) {
    const profileLinkClass = document.querySelectorAll(".profile-link-class");
    profileLinkClass.forEach(link => {
      link.href = "/login.html";
    });
  }
});

const searchSection = document.getElementById("mobile-search");
const searchIcon = document.getElementById("searchIcon");
const menuText = document.querySelector(".menu-text");
const menuProfile = document.querySelectorAll(".menu-profile");
const profileContainer = document.getElementById("profileContainer");

if (!loggedInUser) {
  searchSection.classList.remove("d-none");
  menuText.classList.remove("d-none");
  searchSection.classList.add("d-md-none");
  searchIcon.classList.add("d-none");
  menuProfile.forEach(link => {
    link.classList.add("d-none");
  });
  profileContainer.classList.add("d-none");
}
if (loggedInUser) {
  searchSection.classList.add("d-none");
  menuText.classList.add("d-none");
  searchSection.classList.remove("d-md-none");
  searchIcon.classList.remove("d-none");
  menuProfile.forEach(link => {
    link.classList.remove("d-none");
  });
  profileContainer.classList.remove("d-none");
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
const addListingLink = document.querySelector(".icon-add-listing restricted");
const addListingIcon = document.querySelector(".bi-plus-circle");
const createListingDiv = document.getElementById("create-new-listing");
const addListingText = document.querySelector(".add-listing");

if (addListingLink && createListingDiv) {
  addListingLink.addEventListener("click", event => {
    if (!loggedInUser) {
      console.log("User is not logged in.");
      window.location.href = "/login.html";
    }
    event.preventDefault();
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
  event.preventDefault();
  if (!isLoggedIn) {
    window.location.href = "/login.html";
  } else {
    loadFavorites();
  }
});

const countdownDisplay = document.querySelector(".countdown-display");
if (
  countdownDisplay &&
  countdownDisplay.textContent.includes("Auction ended")
) {
  countdownDisplay.classList.add("bg-warning", "disabled");
}
