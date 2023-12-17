const GOOGLE_API_KEY = "AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4";
MAPTILER_API_KEY = "vGM9UkySm01muh7KGGVl";

const getMapPreview = (lat, long) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
  const imagePreviewUrl2 = `https://api.maptiler.com/maps/streets/static/28.6691565,77.4537578,3/400x300.png?key=vGM9UkySm01muh7KGGVl`;
  return imagePreviewUrl2;
};

export { getMapPreview };
