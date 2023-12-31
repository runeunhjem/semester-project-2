import {
  isLoggedIn,
  loggedInUser,
} from "../variables/constants.mjs";
import { doApiFetch } from "../api/doFetch.mjs";
import {
  API_BASE_URL,
  profilesInclude,
  listingsInclude,
  bidsInclude,
} from "../api/apiurls.mjs";
import { createAuctionTitle } from "./create-profile-listings.mjs";

const urlParams = new URLSearchParams(window.location.search);
const currentProfileName = urlParams.get("profile");

if (loggedInUser) {
  document.querySelectorAll("div.restricted").forEach(div => {
    div.classList.remove("restricted");
  });
}

export async function currentProfile() {
  const currentProfileContainer = document.getElementById("current-profile");
  if (!currentProfileContainer) return;

  // Create elements
  const rowProfilePic = document.createElement("div");
  rowProfilePic.className = "row";

  const colProfilePic = document.createElement("div");
  colProfilePic.className =
    "col-12 mx-0 text-center profile-picture d-flex justify-content-center";

  const profileImage = document.createElement("img");
  profileImage.className =
    "rounded-circle shadow d-flex justify-content-center";
  colProfilePic.appendChild(profileImage);
  rowProfilePic.appendChild(colProfilePic);
  currentProfileContainer.appendChild(rowProfilePic);

  const rowProfileInfo = document.createElement("div");
  rowProfileInfo.className = "row mt-3 mx-0";

  const colProfileInfo = document.createElement("div");
  colProfileInfo.className =
    "col-12 mx-0 profile-info d-flex flex-column align-items-md-start justify-content-start ps-md-5 ms-md-3";

  const profileName = document.createElement("h1");
  // Usage
  if (loggedInUser === currentProfileName) {
    createAuctionTitle(loggedInUser, currentProfileName);
  } else {
    createAuctionTitle(loggedInUser, currentProfileName);
  }

  profileName.className =
    "profile-name text-dark d-flex justify-content-center";

  // Create the 'Change Avatar' label element
  const changeLabel = document.createElement("label");
  changeLabel.setAttribute("for", "avatarInput");
  changeLabel.textContent = "Change Avatar";
  changeLabel.style.cursor = "pointer";
  changeLabel.className = "text-secondary d-block";
  changeLabel.style.display = "none";

  // Create the form
  const changeForm = document.createElement("form");
  changeForm.style.display = "none";
  changeForm.className = "my-2";

  // Create the input field
  const imageInput = document.createElement("input");
  imageInput.id = "avatarInput";
  imageInput.type = "text";
  imageInput.value = "";
  changeForm.appendChild(imageInput);

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary ms-2 ms-md-3";
  submitButton.textContent = "Submit";
  changeForm.appendChild(submitButton);

  // Event listener to submit the form and change the avatar
  changeForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    changeForm.style.display = "none";
    const response = await doApiFetch(
      `${API_BASE_URL}${profilesInclude}/${currentProfileName}/media`,
      "PUT",
      { avatar: imageInput.value }
    );
    const data = await response;
    console.log("New Avatar", data);
    profileImage.src = data.avatar ? data.avatar : "/images/profile.svg";
    profileImage.alt = `${currentProfileName}'s avatar.`;
  });

  // Event listener to toggle the form visibility
  changeLabel.addEventListener("click", function () {
    changeForm.style.display =
      changeForm.style.display === "none" ? "block" : "none";
    imageInput.value = profileImage.src;
  });

  const profileListings = document.createElement("p");
  profileListings.className = "profile-listings fw-bold my-0 py-0";

  const profileContact = document.createElement("p");
  profileContact.className = "profile-listings fw-bold my-0 py-0";

  const profileCredits = document.createElement("p");
  profileCredits.className = "profile-credits fw-bold my-0 py-0";

  const profileWins = document.createElement("p");
  profileWins.className = "profile-wins fw-bold my-0 py-0";

  const profileBids = document.createElement("p");
  profileWins.className = "profile-bids fw-bold my-0 py-0";

  // Append elements
  colProfileInfo.appendChild(profileName);
  if (loggedInUser === currentProfileName) {
    colProfileInfo.appendChild(changeLabel);
  }
  colProfileInfo.appendChild(changeForm);
  colProfileInfo.appendChild(profileContact);
  colProfileInfo.appendChild(profileListings);
  colProfileInfo.appendChild(profileCredits);
  colProfileInfo.appendChild(profileWins);
  colProfileInfo.appendChild(profileBids);
  rowProfileInfo.appendChild(colProfileInfo);
  currentProfileContainer.appendChild(rowProfileInfo);

  // Set content based on login status
  if (isLoggedIn === "true") {
    const response = await doApiFetch(
      `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsInclude}${bidsInclude}`,
      "GET"
    );
    const data = await response;
    const currentProfileData = JSON.stringify(data);
    localStorage.setItem("currentProfileData", currentProfileData);

    profileName.textContent = currentProfileName;
    profileContact.innerHTML = `Contact: <a href="mailto:${data.mail}">${data.email}</a>`;
    profileListings.textContent = `Listings: ${data._count.listings}`;
    profileCredits.innerHTML = `Balance: <i class="bi bi-currency-dollar"></i>${data.credits}`;
    profileWins.textContent = `Wins: ${data.wins.length}`;
    if (data.avatar) {
      profileImage.src = data.avatar;
    } else {
      profileImage.src = "https://picsum.photos/200";
    }
    profileImage.alt = `${currentProfileName}'s avatar.`;
  } else {
    window.location.href = "/login.html";
  }
}
