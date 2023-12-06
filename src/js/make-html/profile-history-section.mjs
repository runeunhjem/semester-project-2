import { doApiFetch } from "../api/doFetch.mjs";
import {
  API_BASE_URL,
  profilesInclude,
  bidsInclude,
  listingsInclude,
  listingsUrl,
  sellerInclude,
} from "../api/apiUrls.mjs";

const urlParams = new URLSearchParams(window.location.search);
const currentProfileName = urlParams.get("profile");

export async function currentProfileHistory() {
  const currentProfileContainer = document.getElementById(
    "current-profile-history"
  );
  if (!currentProfileContainer) return; // Exit if the container is not found

  const row = document.createElement("div");
  row.className = "row w-100";

  const colWins = document.createElement("div");
  colWins.className =
    "col-md-6 wins-history d-flex flex-column align-items-center rounded px-2 mb-3";

  const colBids = document.createElement("div");
  colBids.className =
    "col-md-6 bids-history d-flex flex-column align-items-center rounded px-2 mb-3";

  // Create Wins History Section
  const winsHistoryTitle = document.createElement("h2");
  winsHistoryTitle.className =
    "wins-history-title w-100 text-nowrap align-items-center text-center text-primary border-bottom fs-4 py-2";
  winsHistoryTitle.textContent = "Win History";
  colWins.appendChild(winsHistoryTitle);

  const winsList = document.createElement("div");
  winsList.className = "container wins-entry";
  colWins.appendChild(winsList);

  // Create Bids History Section
  const bidsHistoryTitle = document.createElement("h2");
  bidsHistoryTitle.className =
    "bids-history-title w-100 text-nowrap align-items-center text-center text-primary border-bottom fs-4 py-2";
  bidsHistoryTitle.textContent = "Bid History";
  colBids.appendChild(bidsHistoryTitle);

  const bidsList = document.createElement("div");
  bidsList.className = "container bids-entry";
  colBids.appendChild(bidsList);

  // Append Columns to Row
  row.appendChild(colWins);
  row.appendChild(colBids);
  currentProfileContainer.appendChild(row);

  // Fetch and display win history data
  const winsURL = `${API_BASE_URL}${profilesInclude}/${currentProfileName}${listingsInclude}${bidsInclude}`;

  const winResponse = await doApiFetch(winsURL, "GET");
  const winHistoryData = await winResponse;
  console.log("winHistoryData", winHistoryData);
  winsHistoryTitle.textContent = `Win History (${winHistoryData.wins.length})`;

  // Populate Win History
  for (const win of winHistoryData.wins) {
    const id = win;
    console.log("id", id);
    const getListingURL = `${API_BASE_URL}${listingsUrl}/${id}${sellerInclude}${bidsInclude}`;
    const getListingResponse = await doApiFetch(getListingURL, "GET");
    const getListingData = await getListingResponse; // Assuming the response needs to be converted to JSON
    console.log("getListingData", getListingData);

    const entryDiv = document.createElement("div");
    entryDiv.className = "row history-entry";

    // Column for Listing Image
    const imgCol = document.createElement("div");
    imgCol.className = "col-2";
    const img = document.createElement("img");
    img.src = getListingData.media[0];
    img.style.height = "100px";
    imgCol.appendChild(img);
    entryDiv.appendChild(imgCol);

    // Column for Listing Title and ID
    const titleIdCol = document.createElement("div");
    titleIdCol.className = "col-5";

    const titleRow = document.createElement("div");
    titleRow.className = "row";
    titleRow.textContent = getListingData.title;
    titleRow.className = "win-title text-primary fw-bold text-left ms-0 ps-0";
    titleIdCol.appendChild(titleRow);

    const idRow = document.createElement("div");
    idRow.className = "row";
    idRow.textContent = `ID: ${getListingData.id}`;
    titleIdCol.appendChild(idRow);

    entryDiv.appendChild(titleIdCol);

    // Column for Created Date and Amount
    const dateAmountCol = document.createElement("div");
    dateAmountCol.className = "col-5";

    const dateRow = document.createElement("div");
    dateRow.className = "row";
    dateRow.textContent = `Created: ${win.created}`; // Assuming 'win.created' is the created date
    dateAmountCol.appendChild(dateRow);

    const amountRow = document.createElement("div");
    amountRow.className = "row";
    amountRow.textContent = `Amount: ${winHistoryData.amount}`; // Assuming 'win.amount' is the amount
    dateAmountCol.appendChild(amountRow);

    entryDiv.appendChild(dateAmountCol);

    winsList.appendChild(entryDiv);
  }

  // Similar approach for Bids History
  // ...

  // Fetch and display bid history data
  const bidResponse = await doApiFetch(
    `${API_BASE_URL}${profilesInclude}/${currentProfileName}/bids`,
    "GET"
  );
  const bidHistoryData = await bidResponse;
  console.log("bidHistoryData", bidHistoryData);
  bidsHistoryTitle.textContent = `Bid History (${bidHistoryData.length})`;

  bidHistoryData.forEach(bid => {
    const bidDiv = document.createElement("div");
    bidDiv.className =
      "w-100 col-md-6 bg-wins history-entries d-flex flex-column align-items-center shadow-sm rounded";
    bidDiv.textContent = `Bid: ${bid.amount}`;
    colBids.appendChild(bidDiv);
  });
}
