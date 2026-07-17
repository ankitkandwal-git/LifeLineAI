import axios from "axios";

/**
 * Fetches the human-readable address for a given latitude and longitude using Nominatim Reverse Geocoding API.
 * @param {number|string} lat 
 * @param {number|string} lon 
 * @returns {Promise<string>} Human-readable address
 */
export const fetchAddressFromCoords = async (lat, lon) => {
  if (!lat || !lon) return "Address not available";
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon,
          format: "json",
        },
        headers: {
          // Custom User-Agent to satisfy Nominatim usage policy
          "User-Agent": "LifeLineAI-Backend/1.0 (contact@lifelineai.com)",
        },
      }
    );
    return response.data?.display_name || "Address not available";
  } catch (err) {
    console.error(`Reverse geocoding failed for ${lat}, ${lon}:`, err?.message || err);
    // Graceful fallback on API failure
    return "Address not available";
  }
};

/**
 * Fetches nearby hospitals using the Overpass API.
 */
export const fetchNearbyHospitals = async (latitude, longitude) => {
  const radius = 5000;

  const query = `
[out:json];
(
  node["amenity"="hospital"](around:${radius},${latitude},${longitude});
  way["amenity"="hospital"](around:${radius},${latitude},${longitude});
  relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
);
out center;
`;

  const response = await axios.get(
    "https://overpass-api.de/api/interpreter",
    {
      params: {
        data: query,
      },
      headers: {
        "User-Agent": "LifeLineAI-Backend/1.0 (contact@lifelineai.com)",
      },
    }
  );

  const elements = response.data.elements || [];

  // Fetch addresses asynchronously using Promise.all()
  const elementsWithAddresses = await Promise.all(
    elements.map(async (element) => {
      const lat = element.lat || element.center?.lat;
      const lon = element.lon || element.center?.lon;
      const address = await fetchAddressFromCoords(lat, lon);
      return {
        ...element,
        address,
      };
    })
  );

  return elementsWithAddresses;
};