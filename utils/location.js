const GOOGLE_API_KEY = "AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4";

const getMapPreview = (lat, long) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export { getMapPreview };
