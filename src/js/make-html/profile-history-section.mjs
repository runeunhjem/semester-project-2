import {
  API_BASE_URL,
  listingsUrl,
  listingsInclude,
  profilesInclude,
  bidsInclude,
  sellerInclude,
} from "../api/apiUrls.mjs";
import { doApiFetch } from "../api/doFetch.mjs";
import { convertToShortDateFormat } from "../utils/date-converter.mjs";

const urlParams = new URLSearchParams(window.location.search);
const currentProfileName = urlParams.get("profile");

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

  // Fetch and display bid history (not shown for brevity, similar to win history)
  // ...

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
    try {
      const winResponse = await doApiFetch(winsURL, "GET");
      const winHistoryData = await winResponse;
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
    try {
      const getListingResponse = await doApiFetch(
        getListingURL,
        "GET",
        null,
        true
      ); // Notice the 'true' at the end
      console.log("getListingResponse Status:", getListingResponse.status);
      console.log(
        "getListingResponse StatusCode:",
        getListingResponse.statusCode
      );

      if (!getListingResponse.ok) {
        const statusCode = getListingResponse.status;
        if (statusCode === 404) {
          displayDeletedListing(container);
        } else {
          throw new Error(`HTTP error! status: ${statusCode}`);
        }
      } else {
        const getListingData = getListingResponse.data;
        console.log("getListingData:", getListingData);
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
    entryDiv.className = "row history-entry bg-wins rounded shadow-sm m-2 p-2";

    // Column for Listing Image
    const imgCol = document.createElement("div");
    imgCol.className = "col-auto";
    const img = document.createElement("img");
    img.src = listingData.media[0];
    img.style.height = "100px";
    img.className = "shadow rounded";
    imgCol.appendChild(img);
    entryDiv.appendChild(imgCol);

    // Outer Div for Textual Data
    const outerDiv = document.createElement("div");
    outerDiv.className = "col w-100";

    // Column for Listing Title and ID
    const titleIdCol = document.createElement("div");
    titleIdCol.className = "col-auto";
    const titleRow = document.createElement("div");
    titleRow.className = "win-title text-primary fw-bold text-left ms-0 ps-0";
    titleRow.textContent = listingData.title;
    titleIdCol.appendChild(titleRow);

    const idRow = document.createElement("div");
    idRow.className = "win-id text-secondary text-left ms-0 ps-0";
    idRow.textContent = `ID: ${listingData.id.substring(0, 15)}`;
    titleIdCol.appendChild(idRow);
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
  }

  function displayDeletedListing(container) {
    // Main entry div
    const entryDiv = document.createElement("div");
    entryDiv.className = "row history-entry bg-wins rounded shadow-sm m-2 p-2";

    // Column for Listing Image Placeholder
    const imgCol = document.createElement("div");
    imgCol.className = "col-auto";
    const imgPlaceholder = document.createElement("div"); // Placeholder instead of an actual image
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
    titleRow.className = "win-title text-primary fw-bold text-left ms-0 ps-0";
    titleRow.textContent = "Listing Deleted by Seller";
    titleIdCol.appendChild(titleRow);

    const idRow = document.createElement("div");
    idRow.className = "win-id text-secondary text-left ms-0 ps-0";
    idRow.textContent = "ID: N/A"; // No ID available for deleted listings
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
}
