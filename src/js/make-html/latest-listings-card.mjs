import { getNewestBid } from "../utils/bids-get-highest.mjs";
import { convertToShortDateFormat } from "../utils/date-converter.mjs";

export function createListingCard(listing) {
  // Create the main column div
  const colDiv = document.createElement("div");
  colDiv.className = "col ms-1 p-0 latest-auctions-card";

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
  carouselDiv.className = "carousel slide";
  carouselDiv.id = listing.id; // Use listing ID
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
  titleColDiv.className = "col";
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
    console.log("No bids available");
  }

  const currentBidP = document.createElement("p");
  currentBidP.className = "text-primary text-start ps-2 mb-0";
  currentBidP.innerHTML = `Current Bid: <span class="current-bid">${listing.currentBid}</span>`; // Use listing current bid
  currentBidColDiv.appendChild(currentBidP);

  // Number of bids
  const numberOfBidsColDiv = document.createElement("div");
  numberOfBidsColDiv.className = "col-5 bids text-primary";
  bidRowDiv.appendChild(numberOfBidsColDiv);

  const numberOfBidsP = document.createElement("p");
  numberOfBidsP.className = "text-primary text-end pe-2 mb-0";
  numberOfBidsP.innerHTML = `Bids: <span class="number-of-bids">${listing.bids.length}</span>`; // Use listing bids length
  numberOfBidsColDiv.appendChild(numberOfBidsP);

  // Second row for ends and listing ID
  const endsRowDiv = document.createElement("div");
  endsRowDiv.className = "row d-flex flex-nowrap justify-content-between";
  infoContainerDiv.appendChild(endsRowDiv);

  // Ends at
  const endsColDiv = document.createElement("div");
  endsColDiv.className = "col text-nowrap ends";
  endsRowDiv.appendChild(endsColDiv);

  const endsAt = listing.endsAt;
  const shortEndsAt = convertToShortDateFormat(endsAt);
  const endsP = document.createElement("p");
  endsP.className = "text-black text-start ps-2 mb-1";
  endsP.innerHTML = `Ends: <span class="end-time">${shortEndsAt}</span>`; // Use listing endsAt
  endsColDiv.appendChild(endsP);

  // Listing ID
  const idColDiv = document.createElement("div");
  idColDiv.className = "col text-nowrap text-black listing-id";
  endsRowDiv.appendChild(idColDiv);

  const idP = document.createElement("p");
  idP.className = "text-black fw-bold text-end pe-2 mb-1";
  const shortId = listing.id.slice(0, 3); // Extracts first 3 characters of the ID
  idP.innerHTML = `ID: <span class="listing-id">${shortId}</span>`; // Use shortened ID
  idColDiv.appendChild(idP);

  return colDiv;
}