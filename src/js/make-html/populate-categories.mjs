import { pastelColors } from "../variables/constants.mjs";

const categoriesHeader = document.getElementById("categories-header");

export async function populateCategories(listingsData, containerId) {
  const tagCounts = new Map();
  // Process each listing
  const processListing = listing => {
    if (listing.tags && listing.tags.length > 0) {
      listing.tags.forEach(tagString => {
        // Splitting tags by commas and spaces, and filtering out empty strings
        const tags = tagString.split(/[\s,]+/).filter(tag => tag.trim() !== "");
        tags.forEach(tag => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });
    } else {
      // Handle listings with no tags
      tagCounts.set("Uncategorized", (tagCounts.get("Uncategorized") || 0) + 1);
    }
  };

  // Check if listingsData is an array (for multiple listings) or an object (for a single listing)
  if (Array.isArray(listingsData)) {
    listingsData.forEach(processListing);
  } else if (listingsData && listingsData.tags) {
    processListing(listingsData);
  }

  // Update categories header with count
  updateCategoriesHeader(tagCounts);

  // Populate the specified container
  const container = document.getElementById(containerId);
  if (container) {
    populateContainer(container, tagCounts);
  }
}

function updateCategoriesHeader(tagCounts) {
  const totalCategories = tagCounts.size;
  categoriesHeader.textContent = `Categories (${totalCategories})`;
}

function populateContainer(container, tagCounts) {
  container.innerHTML = "";
  let colorIndex = 0;

  Array.from(tagCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([tag, count]) => {
      const categoryButton = document.createElement("button");
      categoryButton.className =
        "category-button text-nowrap rounded border text-center btn btn-group text-capitalize";
      categoryButton.textContent = `${tag} (${count})`;
      categoryButton.style.backgroundColor = pastelColors[colorIndex];
      colorIndex = (colorIndex + 1) % pastelColors.length;

      // Add click event listener to filter listings
      categoryButton.addEventListener("click", () => {
        filterCardsByCategory(tag);
      });

      container.appendChild(categoryButton);
    });
}

function filterCardsByCategory(category) {
  const allCards = document.querySelectorAll(".latest-auctions-card");
  allCards.forEach(card => {
    const cardCategories = card.getAttribute("data-category").split(",");
    if (cardCategories.includes(category) || category === "All") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
