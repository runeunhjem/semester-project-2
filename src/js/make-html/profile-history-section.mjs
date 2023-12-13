import {
  API_BASE_URL,
  listingsUrl,
  listingsInclude,
  profilesInclude,
  bidsInclude,
  sellerInclude,
} from "../api/apiUrls.mjs";
// import { loggedInUser } from "../variables/constants.mjs";
import { doApiFetch } from "../api/doFetch.mjs";
import {
  convertToShortDateFormat,
  timeSince,
} from "../utils/date-converter.mjs";
import { isValidImage } from "../utils/validate-image.mjs";

const urlParams = new URLSearchParams(window.location.search);
const currentProfileName = urlParams.get("profile");
let getListingData = [];

export async function currentProfileHistory() {
  const currentProfileContainer = document.getElementById(
    "current-profile-history"
  );
  if (!currentProfileContainer) return;

  // Initialize the layout for history display
  const row = document.createElement("div");
  row.className = "row w-100";
  const colWins = createColumn("Wins");
  const colBids = createColumn("Bids");
  row.append(colWins.column, colBids.column);
  currentProfileContainer.appendChild(row);

  // Fetch and display win history
  await displayWinHistory(colWins.list, currentProfileName, colWins.title);

  function createColumn(type) {
    const col = document.createElement("div");
    col.className = `col-md-6 ${type.toLowerCase()}-history d-flex flex-column align-items-center rounded px-2 mb-3`;

    const historyTitle = document.createElement("h2");
    historyTitle.className =
      "history-title w-100 text-nowrap align-items-center text-center text-primary border-bottom fs-4 py-2";
    historyTitle.textContent = `${type} History`;

    const list = document.createElement("div");
    list.className = `container ${type.toLowerCase()}-entry`;

    col.append(historyTitle, list);
    return { column: col, title: historyTitle, list: list };
  }

  async function displayWinHistory(winsList, profileName, titleElement) {
    const winsURL = `${API_BASE_URL}${profilesInclude}/${profileName}${listingsInclude}${bidsInclude}`;
    // console.log("winsURL:", winsURL);
    try {
      const winResponse = await doApiFetch(winsURL, "GET");
      const winHistoryData = await winResponse;
      titleElement.classList.remove("text-primary");
      titleElement.textContent = `Win History (${winHistoryData.wins.length})`;

      for (const win of winHistoryData.wins) {
        await processWinEntry(win, winsList);
      }
    } catch (error) {
      console.error("Error fetching win history:", error);
    }
  }

  async function processWinEntry(winId, container) {
    const getListingURL = `${API_BASE_URL}${listingsUrl}/${winId}${sellerInclude}${bidsInclude}`;
    if (!winId) {
      console.error("No win ID provided.");
      return;
    }
    try {
      const getListingResponse = await doApiFetch(
        getListingURL,
        "GET",
        null,
        true
      );
      // console.log("getListingResponse Status:", getListingResponse.status);

      if (!getListingResponse.ok) {
        const statusCode = getListingResponse.status;
        if (statusCode >= 400 || statusCode < 500) {
          displayDeletedListing(container);
        } else {
          throw new Error(`HTTP error! status: ${statusCode}`);
        }
      } else {
        getListingData = getListingResponse.data;
        // console.log("getListingData:", getListingData);
        displayWinEntry(getListingData, container);
      }
    } catch (error) {
      console.error("Error fetching listing data:", error);
      displayDeletedListing(container);
    }
  }

  function displayWinEntry(listingData, container) {
    // Main entry div
    const entryDiv = document.createElement("div");
    entryDiv.className =
      "row history-entry bg-wins rounded shadow-sm m-2 mb-3 p-2";

    // Column for Listing Image
    const imgCol = document.createElement("div");
    imgCol.className = "col-auto px-0";
    const img = document.createElement("img");

    isValidImage(listingData.media, isValid => {
      if (isValid) {
        // The URL is a valid image
        img.src = listingData.media;
      } else {
        // The URL is not a valid image, use fallback
        img.src = "/images/404-not-found.jpg";
      }
    });

    img.style.height = "100px";
    img.style.width = "100px";
    img.style.objectPosition = "center";
    img.className = "img-fluid shadow rounded m-2 mt-0 object-fit-cover";
    img.setAttribute("alt", `${listingData.title} image`);
    imgCol.appendChild(img);
    entryDiv.appendChild(imgCol);

    // Outer Div for Textual Data
    const outerDiv = document.createElement("div");
    outerDiv.className = "col w-100";

    // URL for navigating to the listing detail page
    const goToWinListingURL = `../auction/listing.html?id=${listingData.id}`;

    // Column for Listing Title and ID
    const titleIdCol = document.createElement("div");
    titleIdCol.className = "col-auto";

    // Create an anchor (link) element for the title
    const titleLink = document.createElement("a");
    titleLink.className = "win-title text-primary fw-bold text-left ms-0 ps-0";
    titleLink.textContent = listingData.title;
    titleLink.href = goToWinListingURL; // Set the link's destination
    titleLink.style.textDecoration = "none"; // Optional: to remove underline from link

    // Append the title link to the column
    titleIdCol.appendChild(titleLink);

    // ID Row
    const idRow = document.createElement("div");
    idRow.className = "win-id text-left ms-0 ps-0";
    idRow.textContent = `ID: ${listingData.id.substring(0, 15)}`;
    titleIdCol.appendChild(idRow);

    // Append the titleIdCol to the outerDiv
    outerDiv.appendChild(titleIdCol);

    // Column for Created Date and Amount
    const dateAmountCol = document.createElement("div");
    dateAmountCol.className = "col-auto";

    const dateRow = document.createElement("div");
    dateRow.className = "win-date text-left ms-0 ps-0";
    const amountRow = document.createElement("div");
    amountRow.className = "win-amount text-left ms-0 ps-0";

    if (listingData.bids && listingData.bids.length > 0) {
      const sortedBids = listingData.bids.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      )[0];
      dateRow.textContent = convertToShortDateFormat(sortedBids.created);
      amountRow.textContent = `Winning bid: $ ${sortedBids.amount}.00`;
    } else {
      dateRow.textContent = "Created: No bids";
      amountRow.textContent = "Amount: No bids";
    }

    dateAmountCol.appendChild(dateRow);
    dateAmountCol.appendChild(amountRow);
    outerDiv.appendChild(dateAmountCol);

    entryDiv.appendChild(outerDiv);
    container.appendChild(entryDiv);
    container.prepend(entryDiv);
  }

  function displayDeletedListing(container) {
    // Main entry div
    const entryDiv = document.createElement("div");
    entryDiv.className =
      "row history-entry bg-warning rounded shadow-sm m-2 mb-3 p-2";

    // Column for Listing Image Placeholder
    const imgCol = document.createElement("div");
    imgCol.className = "col-auto";
    const imgPlaceholder = document.createElement("div");
    imgPlaceholder.style.height = "100px";
    imgPlaceholder.className = "shadow rounded bg-light";
    imgCol.appendChild(imgPlaceholder);
    entryDiv.appendChild(imgCol);

    // Outer Div for Textual Data
    const outerDiv = document.createElement("div");
    outerDiv.className = "col w-100";

    // Column for Listing Title and ID
    const titleIdCol = document.createElement("div");
    titleIdCol.className = "col-auto";
    const titleRow = document.createElement("div");
    titleRow.className = "win-title fw-bold text-left ms-0 ps-0";
    titleRow.textContent = "Listing Deleted by Seller";
    titleIdCol.appendChild(titleRow);

    const idRow = document.createElement("div");
    idRow.className = "win-id text-dark text-left ms-0 ps-0";
    idRow.textContent = `ID: N/A`;
    titleIdCol.appendChild(idRow);
    outerDiv.appendChild(titleIdCol);

    // Column for Created Date and Amount
    const dateAmountCol = document.createElement("div");
    dateAmountCol.className = "col-auto";

    const dateRow = document.createElement("div");
    dateRow.className = "win-date text-left ms-0 ps-0";
    dateRow.textContent = "Created: N/A";

    const amountRow = document.createElement("div");
    amountRow.className = "win-amount text-left ms-0 ps-0";
    amountRow.textContent = "Amount: N/A";

    dateAmountCol.appendChild(dateRow);
    dateAmountCol.appendChild(amountRow);
    outerDiv.appendChild(dateAmountCol);

    entryDiv.appendChild(outerDiv);
    container.appendChild(entryDiv);
  }

  // Fetch and display bid history
  await displayBidHistory(colBids.list, currentProfileName, colBids.title);

  // Bids History
  async function displayBidHistory(bidsList, profileName, titleElement) {
    const bidsURL = `${API_BASE_URL}${profilesInclude}/${profileName}/bids${listingsInclude}`;
    const processedListingIds = new Set(); // Set to track processed listing IDs

    try {
      const bidResponse = await doApiFetch(bidsURL, "GET");
      const bidHistoryData = await bidResponse;
      // Filter bids for the current profile
      const filteredBids = bidHistoryData.filter(
        bid => bid.bidderName === currentProfileName
      );
      titleElement.classList.remove("text-primary");
      titleElement.textContent = `Bid History (${filteredBids.length})`;

      for (const bid of filteredBids) {
        const bidListingId = bid.listing.id;
        if (!processedListingIds.has(bidListingId)) {
          await processBidEntry(bid, bidsList);
          processedListingIds.add(bidListingId);
        }
      }
    } catch (error) {
      console.error("Error fetching bid history:", error);
    }
  }

  async function processBidEntry(bid, container) {
    const {
      listing: { id: bidListingId },
    } = bid;

    const getListingURL = `${API_BASE_URL}${listingsUrl}/${bidListingId}${sellerInclude}${bidsInclude}`;
    if (!bidListingId) {
      console.error("No bid ID provided.");
      return;
    }

    try {
      const getListingResponse = await doApiFetch(getListingURL, "GET");
      const listingData = await getListingResponse;

      // Filter the bids to only include those made by the current profile
      const filteredBids = listingData.bids.filter(
        b => b.bidderName === currentProfileName
      );

      // Now pass only the filtered bids to the displayBidEntry function
      displayBidEntry(bid, { ...listingData, bids: filteredBids }, container);
    } catch (error) {
      console.error("Error fetching listing data for bid entry:", error);
      displayDeletedListing(container);
    }
  }

  async function displayBidEntry(bid, listingData, container) {
    const { created } = bid;
    // eslint-disable-next-line no-unused-vars
    const { media, title, id: listingId, bids, endsAt } = listingData;

    // Check if the listing has ended
    const hasEnded = new Date(endsAt) < new Date();

    // Main entry div
    const entryDiv = document.createElement("div");
    entryDiv.className =
      "row history-entry bg-info rounded shadow-sm m-2 mb-3 p-2";

    // Column for Listing Image
    const imgCol = document.createElement("div");
    imgCol.className = "col-auto";
    const img = document.createElement("img");
    // img.src = media.length === 0 ? "/images/404-not-found.jpg" : media[0];
    isValidImage(listingData.media, isValid => {
      if (isValid) {
        // The URL is a valid image
        img.src = listingData.media;
      } else {
        // The URL is not a valid image, use fallback
        img.src = "/images/404-not-found.jpg";
      }
    });
    img.style.height = "100px";
    img.style.width = "100px";
    img.style.objectPosition = "center";
    img.className = "img-fluid shadow rounded m-2 ms-0 mt-0 object-fit-cover";
    img.setAttribute("alt", `${title} image`);
    imgCol.appendChild(img);
    entryDiv.appendChild(imgCol);

    // Outer Div for Textual Data
    const outerDiv = document.createElement("div");
    outerDiv.className = "col w-100";

    // Column for Listing Title and ID
    const titleIdCol = document.createElement("div");
    titleIdCol.className = "col-auto";
    const titleLink = document.createElement("a");
    titleLink.className = "bid-title text-primary fw-bold text-left ms-0 ps-0";
    titleLink.textContent = title;
    titleLink.href = `/src/html/auction/listing.html?id=${listingId}`;
    titleLink.style.textDecoration = "none";
    titleIdCol.appendChild(titleLink);

    // ID Row
    const idRow = document.createElement("div");
    idRow.className = "bid-id text-left ms-0 ps-0";
    idRow.textContent = `ID: ${listingId.substring(0, 15)}`;

    // Apply text-danger if the listing has ended
    if (hasEnded) {
      idRow.classList.add("text-danger");
      idRow.textContent = `Status: Ended`;
    } else {
      idRow.classList.add("text-success");
      idRow.textContent = `Status: Active`;
    }

    titleIdCol.appendChild(idRow);
    outerDiv.appendChild(titleIdCol);

    // Column for Created Date and All Bids
    const dateAmountCol = document.createElement("div");
    dateAmountCol.className = "col-auto";

    const dateRow = document.createElement("div");
    dateRow.className = "bid-date text-left ms-0 ps-0";
    dateRow.textContent = `Last bid: ${convertToShortDateFormat(created)}`;
    dateAmountCol.appendChild(dateRow);

    const bidsDiv = document.createElement("div");
    bidsDiv.className =
      "bid-all text-left text-nowrap ms-0 ps-0 d-flex flex-column-reverse";
    bidsDiv.textContent = `All bids (${bids.length}): `;

    // Determine the highest bid amount for the listing
    let highestBidAmount = Math.max(...bids.map(bid => bid.amount));
    // console.log("highestBidAmount:", highestBidAmount);

    bids.forEach(bid => {
      const bidInfo = document.createElement("span");
      const bidDate = timeSince(bid.created);
      bidInfo.textContent = `$${bid.amount}.00 - ${bidDate}`;
      bidInfo.className = "my-1 border-bottom";

      // Check if the bid is the highest and made by currentProfileName
      if (
        bid.amount === highestBidAmount &&
        bid.bidderName === currentProfileName
      ) {
        bidInfo.classList.add("text-success", "fw-bold");
      }

      bidsDiv.appendChild(bidInfo);
    });

    dateAmountCol.appendChild(bidsDiv);
    outerDiv.appendChild(dateAmountCol);
    entryDiv.appendChild(outerDiv);
    container.appendChild(entryDiv);
  }
}
