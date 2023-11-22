export function updateProfileDisplay() {
  const profileContainer = document.getElementById("profileContainer");
  if (!profileContainer) return; // Exit if the container is not found

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Create elements
  const colProfileInfo = document.createElement("div");
  colProfileInfo.className = "col-9 col-md-4 ms-md-2 text-md-end profile-info";

  const profileName = document.createElement("p");
  profileName.className = "p-0 m-0 profile-name d-flex text-nowrap";

  const profileListings = document.createElement("p");
  profileListings.className = "p-0 m-0 profile-listings d-flex text-nowrap";

  const profileCredits = document.createElement("p");
  profileCredits.className = "p-0 m-0 profile-credits d-flex text-nowrap";

  const colProfilePic = document.createElement("div");
  colProfilePic.className =
    "col-3 col-md-2 col-lg-2 d-flex justify-content-end profile-pic";

  const profileImage = document.createElement("img");
  profileImage.className = "header-profile-image rounded-circle shadow";

  // Append elements
  colProfileInfo.appendChild(profileName);
  colProfileInfo.appendChild(profileListings);
  colProfileInfo.appendChild(profileCredits);
  colProfilePic.appendChild(profileImage);
  profileContainer.appendChild(colProfileInfo);
  profileContainer.appendChild(colProfilePic);

  // Set content based on login status
  if (isLoggedIn === "true") {
    profileName.textContent = "runeunhjem";
    profileListings.textContent = "Listings: 1";
    profileCredits.innerHTML =
      'Balance: <i class="bi bi-currency-dollar"></i>1000';
    profileImage.src = "/images/rune-profile-pic-medium.jpg";
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
