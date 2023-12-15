export function isValidImage(url, callback) {
  let testImage = new Image();
  testImage.onload = () => callback(true); // Image loaded successfully
  testImage.onerror = () => callback(false); // Error loading image

  testImage.src = url;
}
