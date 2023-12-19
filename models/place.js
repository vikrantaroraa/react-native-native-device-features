export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, long: location.long }; // { lat: 129.098567, long: 243.564298 }
    this.id = new Date().toString() + Math.random().toString();
  }
}
