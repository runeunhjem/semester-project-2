const profileAuctionsTitle = document.getElementById("toggleProfileAuctions");

export function createAuctionTitle(user, profileName) {

  profileAuctionsTitle.innerHTML = "";

  // Create main text node
  const textNode = document.createTextNode(
    user === profileName ? "Your auctions " : `${profileName}'s auctions `
  );
  profileAuctionsTitle.appendChild(textNode);

  // Create container div for icons
  const iconsDiv = document.createElement("div");
  iconsDiv.className = "d-flex align-items-center";

  // Create close icon and span
  const closeIcon = document.createElement("i");
  closeIcon.className = "bi bi-x-circle fs-5 close-section me-1";
  closeIcon.id = "closeSearchResults";
  const closeSpan = document.createElement("span");
  closeSpan.className =
    "fs-5 close-section align-items-center text-right ms-1 me-1";
  closeSpan.textContent = "Close";
  closeIcon.appendChild(closeSpan);

  // Create chevron icon
  const chevronIcon = document.createElement("i");
  chevronIcon.className = "bi bi-chevron-up";
  chevronIcon.id = "chevronIcon";

  // Append icons to div
  iconsDiv.appendChild(closeIcon);
  iconsDiv.appendChild(chevronIcon);

  // Append div to profileAuctionsTitle
  profileAuctionsTitle.appendChild(iconsDiv);

  // Event listener for close icon
  closeIcon.addEventListener("click", function () {
    const sectionToClose = this.closest(".section-container");
    if (sectionToClose) {
      sectionToClose.classList.add("d-none");
    }
  });
}
