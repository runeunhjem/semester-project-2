import { updateListing } from "../api/edit-listing.mjs";

export function editListingForm(id, listing) {
  const parentElement = document.getElementById("edit-listing");
  if (!parentElement) {
    console.error("Parent element not found");
    return;
  }
  parentElement.innerHTML = "";

  // Main container div
  const mainDiv = document.createElement("div");
  mainDiv.className = "mb-3 w-100";

  // Card body div
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body w-100 collapse show";
  cardBodyDiv.id = "editListingForm";

  // Card title changed to 'Edit auction...'
  const cardTitle = document.createElement("h1");
  cardTitle.className = "card-title fs-3 text-center mt-3 text-primary";
  cardTitle.textContent = "Edit auction...";
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
    isRequired,
    value = ""
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
    if (inputId === "endsAt") {
      input.disabled = true; // Disable the input field
      input.type = "datetime-local"; // Change to 'datetime-local' to capture both date and time
    }
    if (inputType !== "textarea") {
      input.type = inputType;
    }
    input.className = "form-control";
    input.id = inputId;
    input.name = inputId; // 'name' attribute set to match 'id'
    input.placeholder = placeholder;
    if (isRequired) {
      input.required = true;
    }
    if (inputType === "textarea") {
      input.rows = 4;
    }
    input.value = value; // Set the value of the input

    div.appendChild(input);

    return div;
  };

  // Function to add additional image URL input
  const addImageUrlInput = () => {
    const newImageUrlDiv = createInputGroup(
      "Additional Image URL",
      "url",
      "media",
      "Valid image URL",
      false
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
    createInputGroup("End Date", "datetime-local", "endsAt", "", true, true)
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
      "description",
      "Write something",
      true
    )
  );

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary text-white me-3";
  submitButton.id = "update-listing";
  submitButton.textContent = "Update Listing";
  form.appendChild(submitButton);

  cardBodyDiv.appendChild(form);
  mainDiv.appendChild(cardBodyDiv);
  parentElement.appendChild(mainDiv);

  // Logic to pre-fill the form with listing data
  const prefillForm = () => {
    document.getElementById("title").value = listing.title || "";
    document.getElementById("description").value = listing.description || "";
    document.getElementById("tags").value = listing.tags?.join(", ") || "";
    if (listing.endsAt) {
      // Convert the endsAt to a format suitable for a datetime-local input
      const endsAtValue = new Date(listing.endsAt).toISOString().slice(0, 16);
      document.getElementById("endsAt").value = endsAtValue;
    }

    // Handling image URLs
    if (listing.media && listing.media.length > 0) {
      document.getElementById("media").value = listing.media[0]; // Set value for the first image URL

      // Create additional image URL inputs for each additional image
      listing.media.slice(1).forEach(url => {
        const newImageUrlDiv = createInputGroup(
          "Additional Image URL",
          "url",
          // `media-${Math.random()}`, // Unique ID for each input
          "media", // Unique ID for each input
          "Valid image URL",
          false,
          url // Pass the URL as the value
        );
        form.insertBefore(newImageUrlDiv, addImageButton);
      });
    }
  };

  // Modify form submission logic for updating a listing
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Create FormData object from the form
    let formData = new FormData(form);

    // Get the endsAt value and convert it to ISO string format if necessary
    let endsAt = formData.get("endsAt");
    if (endsAt) {
      endsAt = new Date(endsAt).toISOString();
    }

    // Construct the updated listing data object
    let updatedListingData = {
      title: formData.get("title"),
      description: formData.get("description"),
      tags: formData
        .get("tags")
        .split(",")
        .map(tag => tag.trim()),
      media: formData.getAll("media"),
      endsAt: endsAt,
    };

    // Call the API function to update the listing
    updateListing(id, updatedListingData); // Pass the updated data and the listing's ID
  });

  // Add a cancel button
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "btn btn-dark text-white";
  cancelButton.textContent = "Cancel";
  cancelButton.setAttribute("data-bs-toggle", "collapse");
  cancelButton.setAttribute("data-bs-target", "#edit-listing");
  cancelButton.setAttribute("aria-expanded", "false");
  cancelButton.addEventListener("click", function () {
    // Logic to handle cancel action, e.g., clear form or redirect
    // window.location.href = '/some-redirect-url'; // Redirect to another page
    form.reset(); // Or just reset the form
  });

  // Append both submit and cancel buttons to the form
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";
  buttonGroup.appendChild(submitButton);
  buttonGroup.appendChild(cancelButton);
  form.appendChild(buttonGroup);

  // Pre-fill the form when it's created
  prefillForm();
}
