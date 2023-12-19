const GOOGLE_API_KEY = "AIzaSyB19pWfwvyiUyFqvLO_gtp55LubxTffXGM";
// MAPTILER_API_KEY = "vGM9UkySm01muh7KGGVl";

export const getMapPreview = (lat, long) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
  const imagePreviewUrl2 = `https://api.maptiler.com/maps/streets/static/28.6691565,77.4537578,3/400x300.png?key=vGM9UkySm01muh7KGGVl`;
  return imagePreviewUrl2;
};

export const getAddress = async (lat, long) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  const address = data.results[0].formatted_data;
  return address;
};
