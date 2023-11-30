export async function populateCategories(listingsData) {
  const tagCounts = new Map();

  // Process each listing
  const processListing = listing => {
    if (listing.tags.length > 0) {
      listing.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
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

  // Populate containers
  const categoriesContainerIndex = document.getElementById("categories");
  if (categoriesContainerIndex) {
    populateContainer(categoriesContainerIndex, tagCounts);
  }

  const categoriesContainerListing =
    document.getElementById("categories-listing");
  if (categoriesContainerListing) {
    populateContainer(categoriesContainerListing, tagCounts);
  }
}

function populateContainer(container, tagCounts) {
  container.innerHTML = "";

  Array.from(tagCounts)
    .sort((a, b) => a[0].localeCompare(b[0])) // Sort by tag name
    .forEach(([tag, count]) => {
      const categoryButton = document.createElement("button");
      categoryButton.className =
        "category-button bg-white text-nowrap rounded border text-center btn btn-group text-capitalize";
      categoryButton.textContent = `${tag} (${count})`;
      container.appendChild(categoryButton);
    });
}
