// createNewListingForm.mjs
export function createNewListingForm(parentElementId) {
  const parentElement = document.getElementById(parentElementId);
  parentElement.innerHTML = "";
  if (!parentElement) {
    console.error("Parent element not found");
    return;
  }

  // Main container div
  const mainDiv = document.createElement("div");
  mainDiv.className = "mb-3 max-width-1200";

  // Card body div
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body collapse show";
  cardBodyDiv.id = "createListingForm";

  // Card title
  const cardTitle = document.createElement("h1");
  cardTitle.className = "card-title fs-3 text-center mt-3 text-primary";
  cardTitle.textContent = "Create new auction...";
  cardBodyDiv.appendChild(cardTitle);

  // Form
  const form = document.createElement("form");
  form.id = "listingForm";
  form.className =
    "needs-validation was-validated border border-1 p-3 my-2 p-md-4 my-md-3 rounded shadow-sm";
  form.setAttribute("novalidate", "");

  // Function to create input groups
  const createInputGroup = (
    labelText,
    inputType,
    inputId,
    placeholder,
    isRequired
  ) => {
    const div = document.createElement("div");
    div.className = "mb-3";

    const label = document.createElement("label");
    label.className = "form-label";
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    div.appendChild(label);

    const input = document.createElement(
      inputType === "textarea" ? "textarea" : "input"
    );
    if (inputType !== "textarea") {
      input.type = inputType;
    }
    input.className = "form-control";
    input.id = inputId;
    input.name = inputId;
    input.placeholder = placeholder;
    if (isRequired) {
      input.required = true;
    }
    if (inputType === "textarea") {
      input.rows = 4;
    }
    div.appendChild(input);

    return div;
  };

  // Function to add additional image URL input
  const addImageUrlInput = () => {
    const newImageUrlDiv = createInputGroup(
      "Additional Image URL",
      "url",
      `media-${Date.now()}`,
      "Valid image URL",
      true
    );
    form.insertBefore(newImageUrlDiv, addImageButton); // Insert before the 'Add Image' button
  };

  // 'Add Image' button
  const addImageButton = document.createElement("button");
  addImageButton.type = "button";
  addImageButton.className = "btn btn-secondary mb-3";
  addImageButton.textContent = "Add Another Image";
  addImageButton.addEventListener("click", addImageUrlInput);

  // Adding input groups
  form.appendChild(
    createInputGroup(
      "Listing Title",
      "text",
      "title",
      "Title of the listing",
      true
    )
  );
  const imageInputDiv = createInputGroup(
    "Listing Image URL",
    "url",
    "media",
    "Valid image URL",
    true
  );
  form.appendChild(imageInputDiv);
  // Append the 'Add Image' button after the image URL input
  form.appendChild(addImageButton);

  // Add end date input
  form.appendChild(
    createInputGroup("End Date", "date", "endDate", "YYYY-MM-DD", true)
  );

  form.appendChild(
    createInputGroup(
      "Listing Categories",
      "text",
      "tags",
      "Separate them with a comma",
      true
    )
  );
  form.appendChild(
    createInputGroup(
      "Listing Description",
      "textarea",
      "newListingBody",
      "Write something",
      true
    )
  );

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary text-white";
  submitButton.id = "create-new-listing";
  submitButton.textContent = "Create Listing";
  form.appendChild(submitButton);

  cardBodyDiv.appendChild(form);
  mainDiv.appendChild(cardBodyDiv);
  parentElement.appendChild(mainDiv);
}
