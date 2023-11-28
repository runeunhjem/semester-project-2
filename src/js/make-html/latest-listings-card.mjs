import { getNewestBid } from "../utils/bids-get-highest.mjs";
// import { convertToShortDateFormat } from "../utils/date-converter.mjs";
import { updateCountdownDisplay } from "../utils/update-time-to-end.mjs"; // Adjust path as necessary

export function createListingCard(listing) {
  // Create the main column div
  const colDiv = document.createElement("div");
  colDiv.className = "col ms-1 p-0 latest-auctions-card";
  colDiv.setAttribute("data-post-id", listing.id);
  colDiv.setAttribute("data-post-sellerName", listing.seller.name);
  colDiv.setAttribute("data-post-sellerAvatar", listing.seller.avatar);
  colDiv.setAttribute("data-post-sellerWins", listing.seller.wins.length);
  colDiv.setAttribute("data-post-listingBids", listing._count.bids);
  colDiv.addEventListener("mouseover", handlePostCardClick);
  colDiv.addEventListener("click", () => {
    window.location.href = `/src/html/auction/listing.html?id=${listing.id}`;
  });
  // Create container div
  const containerDiv = document.createElement("div");
  containerDiv.className = "container listings";
  colDiv.appendChild(containerDiv);

  // Create row div for the card
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";
  containerDiv.appendChild(rowDiv);

  // Create column div for the card
  const cardColDiv = document.createElement("div");
  cardColDiv.className = "col";
  rowDiv.appendChild(cardColDiv);

  // Create the card div
  const cardDiv = document.createElement("div");
  cardDiv.className = "card mx-auto shadow-sm";
  cardColDiv.appendChild(cardDiv);

  // Create the carousel
  const carouselDiv = document.createElement("div");
  carouselDiv.id = listing.id; // Use listing ID
  carouselDiv.className = "carousel slide";
  carouselDiv.setAttribute("data-bs-ride", "carousel");
  cardDiv.appendChild(carouselDiv);

  // Create carousel-inner div
  const carouselInnerDiv = document.createElement("div");
  carouselInnerDiv.className = "carousel-inner rounded-top";
  carouselDiv.appendChild(carouselInnerDiv);

  // Create carousel items
  listing.media.forEach((mediaUrl, index) => {
    const carouselItemDiv = document.createElement("div");
    carouselItemDiv.className =
      "carousel-item" + (index === 0 ? " active" : "");
    carouselInnerDiv.appendChild(carouselItemDiv);

    const img = document.createElement("img");

    img.src = mediaUrl;
    img.className = "d-block w-100 carousel-image";
    img.alt = `Carousel image ${index + 1}`;
    carouselItemDiv.appendChild(img);
  });

  // Overlay icon
  const overlayDiv = document.createElement("div");
  overlayDiv.className = "overlay-icon px-2 shadow";
  carouselDiv.appendChild(overlayDiv);

  const starIcon = document.createElement("i");
  starIcon.className = "bi bi-star";
  overlayDiv.appendChild(starIcon);

  // Title
  const titleRowDiv = document.createElement("div");
  titleRowDiv.className = "row";
  cardDiv.appendChild(titleRowDiv);

  const titleColDiv = document.createElement("div");
  titleColDiv.className = "col title-listing";
  titleRowDiv.appendChild(titleColDiv);

  const titleH1 = document.createElement("h1");
  titleH1.className =
    "py-1 mb-2 border-bottom text-center fs-3 listing-title align-items-center text-primary";
  titleH1.textContent = listing.title; // Use listing title
  titleColDiv.appendChild(titleH1);

  // Description
  const descRowDiv = document.createElement("div");
  descRowDiv.className = "row";
  cardDiv.appendChild(descRowDiv);

  const descColDiv = document.createElement("div");
  descColDiv.className = "col";
  descRowDiv.appendChild(descColDiv);

  const descP = document.createElement("p");
  descP.className = "text-start lh-sm px-2 mb-1 listing-description";
  descP.textContent = listing.description; // Use listing description
  descColDiv.appendChild(descP);

  // Bid and ID info
  // Create container for bid and ending info
  const infoContainerDiv = document.createElement("div");
  infoContainerDiv.className = "container px-0 border-top";
  cardDiv.appendChild(infoContainerDiv);

  // First row for current bid and number of bids
  const bidRowDiv = document.createElement("div");
  bidRowDiv.className = "row d-flex flex-nowrap justify-content-between";
  infoContainerDiv.appendChild(bidRowDiv);

  // Current bid
  const currentBidColDiv = document.createElement("div");
  currentBidColDiv.className = "col-7 bids text-primary";
  bidRowDiv.appendChild(currentBidColDiv);

  // Get the newest bid
  const currentBid = getNewestBid(listing.bids);
  if (currentBid) {
    listing.currentBid = currentBid.amount;
  } else {
    listing.currentBid = 0;
    // console.log("No bids available");
  }

  const currentBidP = document.createElement("p");
  currentBidP.className = "text-primary text-start ps-2 mb-0 current-bid";
  currentBidP.innerHTML = `Current Bid: <span class="current-bid">${listing.currentBid}</span>`; // Use listings newest bid
  currentBidColDiv.appendChild(currentBidP);

  // Number of bids
  const numberOfBidsColDiv = document.createElement("div");
  numberOfBidsColDiv.className = "col-5 bids text-primary";
  bidRowDiv.appendChild(numberOfBidsColDiv);

  const numberOfBidsP = document.createElement("p");
  numberOfBidsP.className = "text-primary text-end pe-2 mb-0";
  numberOfBidsP.innerHTML = `Bids: <span class="number-of-bids">${listing.bids.length}</span>`; // Use listings bids length
  numberOfBidsColDiv.appendChild(numberOfBidsP);

  // Second row for ends and listing ID
  const endsRowDiv = document.createElement("div");
  endsRowDiv.className = "row d-flex flex-nowrap justify-content-between";
  infoContainerDiv.appendChild(endsRowDiv);

  // Ends at
  const endsColDiv = document.createElement("div");
  endsColDiv.className =
    "col text-nowrap ends ps-3 d-flex justify-content-between";
  endsRowDiv.appendChild(endsColDiv);

  // Create and append the countdown display element
  const countdownDisplay = document.createElement("p");
  countdownDisplay.className = "countdown-display text-danger";
  endsColDiv.appendChild(countdownDisplay);

  // Update the countdown every second
  const countdownInterval = setInterval(() => {
    updateCountdownDisplay(listing.endsAt, countdownDisplay, countdownInterval);
  }, 1000);

  // Listing ID
  const idColDiv = document.createElement("div");
  idColDiv.className = "col text-nowrap text-black listing-id px-0";
  endsRowDiv.appendChild(idColDiv);

  const idP = document.createElement("p");
  idP.className = "text-black fw-bold text-end pe-4 mb-1";
  const shortId = listing.id.slice(0, 3); // Extracts first 3 characters of the ID
  idP.innerHTML = `ID: <span class="listing-id">${shortId}</span>`; // Use shortened ID
  idColDiv.appendChild(idP);

  return colDiv;
}

// Sets the post ID and author name in localStorage and checks if it is the logged in user when a post card is clicked
export async function handlePostCardClick(event) {
  const card = event.currentTarget;

  const listingId = card.getAttribute("data-post-id");
  const listingBids = card.getAttribute("data-post-listingBids");
  const sellerName = card.getAttribute("data-post-sellerName");
  const sellerAvatar = card.getAttribute("data-post-sellerAvatar");
  const sellerWins = card.getAttribute("data-post-sellerWins");

  localStorage.setItem("listingId", listingId);
  localStorage.setItem("listingBids", listingBids);
  localStorage.setItem("sellerName", sellerName);
  localStorage.setItem("sellerAvatar", sellerAvatar);
  localStorage.setItem("sellerWins", sellerWins);

  // if (authorName !== loggedInUser) {
  //   localStorage.setItem("isLoggedIn", false);
  // } else if (authorName === loggedInUser) {
  //   localStorage.setItem("isLoggedIn", true);
  // }
}
