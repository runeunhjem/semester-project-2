// make-html/create-bid-container.mjs
export function createBidContainer(highestBid) {
  const bidContainer = document.getElementById("place-bid");
  if (!bidContainer) {
    console.error("Bid container not found.");
    return;
  }

  // Create label row
  const labelRowDiv = document.createElement("div");
  labelRowDiv.className = "mb-2"; // Margin bottom for spacing

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Amount: ";
  amountLabel.setAttribute("for", "bidAmount");
  amountLabel.className =
    "form-label fw-bold text-black text-start align-self-center";

  labelRowDiv.appendChild(amountLabel);

  // Create input and button row
  const inputButtonRowDiv = document.createElement("div");
  inputButtonRowDiv.className = "d-flex mx-auto align-items-center"; // Flexbox for alignment

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.id = "bidAmount";
  amountInput.style.textIndent = "4px";
  amountInput.style.width = "80px";
  amountInput.className = "form-control mx-2";
  amountInput.placeholder = "Enter your bid";
  amountInput.value = highestBid + 1; // Set initial value to highest bid + 1

  const submitButton = document.createElement("button");
  submitButton.textContent = "Place Bid";
  submitButton.className = "btn btn-primary mx-2"; // Margin for spacing

  inputButtonRowDiv.appendChild(amountInput);
  inputButtonRowDiv.appendChild(submitButton);

  // Append rows to the container
  bidContainer.appendChild(labelRowDiv);
  bidContainer.appendChild(inputButtonRowDiv);
}
