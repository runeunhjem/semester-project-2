export function getNewestBid(bids) {
  if (!bids || bids.length === 0) {
    return null; // or a default value
  }

  return bids.reduce((newest, current) => {
    return new Date(current.created) > new Date(newest.created)
      ? current
      : newest;
  });
}
