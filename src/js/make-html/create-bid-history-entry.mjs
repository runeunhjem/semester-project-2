// make-html/create-bid-history-entry.mjs
export function createBidEntry(bid) {
  const bidEntry = document.createElement("div");
  bidEntry.className = "border-bottom py-2";

  // First row div for bid ID and date
  const firstRowDiv = document.createElement("div");
  firstRowDiv.className = "d-flex justify-content-between m-0 p-0";
  const bidIdSpan = document.createElement("span");
  const shortId = bid.id.slice(0, 3);
  bidIdSpan.textContent = `ID: ${shortId}`;
  bidIdSpan.className = "fw-bold";
  const dateSpan = document.createElement("span");
  dateSpan.textContent = `Date: ${new Date(bid.created).toLocaleString()}`;
  dateSpan.className = "bid-date";
  firstRowDiv.appendChild(bidIdSpan);
  firstRowDiv.appendChild(dateSpan);

  // Second row div for bidder name and amount
  const secondRowDiv = document.createElement("div");
  secondRowDiv.className = "d-flex justify-content-between m-0 p-0";

  // Create an anchor tag for bidder name
  const bidderNameLink = document.createElement("a");
  bidderNameLink.href = `/src/html/profile/index.html?profile=${bid.bidderName}`;
  bidderNameLink.textContent = `Name: ${bid.bidderName}`;
  bidderNameLink.className = "text-primary";
  secondRowDiv.appendChild(bidderNameLink);

  // Amount span
  const amountSpan = document.createElement("span");
  amountSpan.textContent = `Amount: ${bid.amount}`;
  amountSpan.className = "fw-bold";
  secondRowDiv.appendChild(amountSpan);

  bidEntry.appendChild(firstRowDiv);
  bidEntry.appendChild(secondRowDiv);

  return bidEntry;
}
