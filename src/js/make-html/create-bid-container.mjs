export function createBidContainer() {
  const bidContainer = document.getElementById("place-bid");
  if (!bidContainer) {
    console.error("Bid container not found.");
    return;
  }

  // Create a Bootstrap row
  const rowDiv = document.createElement("div");
  rowDiv.className =
    "row d-flex flex-nowrap w-100 justify-content-between align-items-center px-0 mx-auto";

  // Create columns for label, input, and button
  const labelCol = document.createElement("div");
  labelCol.className =
    "col-3 py-0 d-flex align-items-center justify-content-start"; // Adjust as needed

  const inputCol = document.createElement("div");
  inputCol.className =
    "col-4 py-0 ms-3 px-0 d-flex align-items-center justify-content-start amount-input"; // Adjust as needed

  const buttonCol = document.createElement("div");
  buttonCol.className =
    "col-5 py-0 ps-0 d-flex align-items-center justify-content-end"; // Adjust as needed

  // Create elements
  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Amount: ";
  amountLabel.setAttribute("for", "bidAmount");
  amountLabel.className = "form-label fw-bold mt-2 text-black text-start";

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.id = "bidAmount";
  amountInput.style.textIndent = "10px";
  amountInput.className = "form-control px-0";
  amountInput.placeholder = "Amount";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Place Bid";
  submitButton.className = "btn btn-primary px-1";
  submitButton.addEventListener("click", () => {
    const bidValue = amountInput.value;
    // Validate and submit bid logic here
    console.log("Bid submitted:", bidValue);
    // Add API submission logic here
  });

  // Append elements to their respective columns
  labelCol.appendChild(amountLabel);
  inputCol.appendChild(amountInput);
  buttonCol.appendChild(submitButton);

  // Append columns to the row
  rowDiv.appendChild(labelCol);
  rowDiv.appendChild(inputCol);
  rowDiv.appendChild(buttonCol);

  // Append the row to the container
  bidContainer.appendChild(rowDiv);
}
