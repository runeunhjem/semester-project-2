// apiUrls.mjs

const API_BASE_URL = "https://api.noroff.dev/api/v1/auction";
const registerUrl = "/auth/register";
const loginUrl = "/auth/login";
const profileUrl = "/profiles";
const listingsUrl = "/listings";
const sellerInclude = "?_seller=true";
const bidsInclude = "&_bids=true";
const tagsInclude = "&_tag=test";
const activeListings = "&_active=true";

export {
  API_BASE_URL,
  registerUrl,
  loginUrl,
  profileUrl,
  listingsUrl,
  sellerInclude,
  bidsInclude,
  tagsInclude,
  activeListings,
};
