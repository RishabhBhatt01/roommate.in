import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../config/envConfig";b
import Owner from '../models/Owner.js'

const address = Owner.address;

const geocodeAddress = async (address) => {
  const apiKey = GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await axios.get(url);

  response.status(200).json({ address : " address received" })


  if (response.data.status === "OK") {
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } else {
    throw new Error("Geocoding failed: " + response.data.status);
  }
};
export default geocodeAddress;
