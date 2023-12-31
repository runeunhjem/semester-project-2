import { isLoggedIn, loggedInUser } from "../variables/constants.mjs";
import { doApiFetch } from "../api/doFetch.mjs";
import { API_BASE_URL, profilesInclude } from "../api/apiurls.mjs";

export async function updateProfileDisplay() {
  const profileContainer = document.getElementById("profileContainer");
  if (!profileContainer) return;

  // Create elements
  const colProfileInfo = document.createElement("div");
  colProfileInfo.className = "col col-md-4 ms-md-2 text-md-end profile-info";

  const profileName = document.createElement("p");
  profileName.className = "p-0 m-0 profile-name d-flex text-nowrap";

  const profileListings = document.createElement("p");
  profileListings.className = "p-0 m-0 profile-listings d-flex text-nowrap";

  const profileCredits = document.createElement("p");
  profileCredits.className = "p-0 m-0 profile-credits d-flex text-nowrap";

  const colProfilePic = document.createElement("div");
  colProfilePic.className =
    "col col-md-2 col-lg-2 d-flex justify-content-end profile-pic";

  const profileImage = document.createElement("img");
  profileImage.className = "header-profile-image rounded-circle shadow";
  profileImage.setAttribute("alt", `${loggedInUser}'s Profile image`);

  // Create anchor elements
  const profileNameLink = document.createElement("a");
  const profileImageLink = document.createElement("a");

  if (!loggedInUser) {
    // If loggedInUser is not defined, set the links to point to login page
    profileNameLink.href = "/login.html";
    profileImageLink.href = "/login.html";
  } else {
    // If loggedInUser is defined, set the links to the profile page with the user's profile
    profileNameLink.href = `/src/html/profile/index.html?profile=${loggedInUser}`;
    profileImageLink.href = `/src/html/profile/index.html?profile=${loggedInUser}`;
  }

  profileNameLink.appendChild(profileName);
  profileImageLink.appendChild(profileImage);

  // Append elements
  colProfileInfo.appendChild(profileNameLink);
  colProfileInfo.appendChild(profileListings);
  colProfileInfo.appendChild(profileCredits);
  colProfilePic.appendChild(profileImageLink);
  profileContainer.appendChild(colProfileInfo);
  profileContainer.appendChild(colProfilePic);

  // Set content based on login status
  if (isLoggedIn === "true") {
    const response = await doApiFetch(
      `${API_BASE_URL}${profilesInclude}/${loggedInUser}?_listings=true`,
      "GET"
    );
    const data = await response;
    const loggedInUserData = JSON.stringify(data);
    localStorage.setItem("loggedInUserData", loggedInUserData);

    profileName.textContent = loggedInUser;
    profileListings.textContent = `Listings: ${data._count.listings}`;
    profileCredits.innerHTML = `Balance: <i class="bi bi-currency-dollar"></i>${data.credits}`;
    profileImage.src = data.avatar;
    profileImage.alt = "Profile image of runeunhjem";
  } else {
    profileName.textContent = "Profile name";
    profileListings.textContent = "Listings: 0";
    profileCredits.innerHTML =
      'Balance: <i class="bi bi-currency-dollar"></i>0';
    profileImage.src = "/images/profile.svg";
    profileImage.alt = "Profile image of a user";
  }
}
