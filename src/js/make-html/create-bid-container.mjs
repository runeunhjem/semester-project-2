// make-html/create-bid-container.mjs
import { bidOnListing } from "../api/bid-on-listing.mjs";
// import { loggedInUser } from "../variables/constants.mjs";

export function createBidContainer(highestBid) {
  const bidContainer = document.getElementById("place-bid");
  if (!bidContainer) {
    console.error("Bid container not found.");
    return;
  }

  // Create label row
  const labelRowDiv = document.createElement("div");
  labelRowDiv.className = "mb-2 mx-auto";

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Amount: ";
  amountLabel.setAttribute("for", "bidAmount");
  amountLabel.className =
    "form-label fw-bold text-black mx-auto align-self-center";
  labelRowDiv.appendChild(amountLabel);

  // Create input and button row
  const inputButtonRowDiv = document.createElement("div");
  inputButtonRowDiv.className = "d-flex mx-auto align-items-center";

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.id = "bidAmount";
  amountInput.style.textIndent = "4px";
  amountInput.style.width = "80px";
  amountInput.className = "form-control mx-2";
  amountInput.placeholder = "Enter your bid";
  amountInput.value = highestBid + 1;
  inputButtonRowDiv.appendChild(amountInput);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Place Bid";
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary mx-2 place-bid";
  submitButton.setAttribute("id", "bid-button");

  // // Check if the user is the seller
  // const sellerNameElement = document.querySelector(".seller-name");
  // if (
  //   sellerNameElement &&
  //   sellerNameElement.textContent.includes(loggedInUser)
  // ) {
  //   submitButton.disabled = true;
  //   submitButton.textContent = "You cannot bid on your own listing.";
  // }

  submitButton.addEventListener("click", () => {
    bidOnListing(amountInput.value, localStorage.getItem("listingId"));
    submitButton.classList.add("bg-success");
    submitButton.textContent = "Bid Placed";
  });

  inputButtonRowDiv.appendChild(submitButton);
  bidContainer.appendChild(labelRowDiv);
  bidContainer.appendChild(inputButtonRowDiv);
}
