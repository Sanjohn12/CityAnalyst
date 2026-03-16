import axios from 'axios';

/**
 * Utility to fetch accessibility data from OpenStreetMap using the Overpass API.
 */
const osmFetcher = {
  /**
   * Fetches wheelchair-accessible features within a bounding box.
   * @param {Array<number>} bbox - [minLat, minLon, maxLat, maxLon]
   * @returns {Promise<Object>} GeoJSON data
   */
  fetchWheelchairData: async (bbox) => {
    const [minLat, minLon, maxLat, maxLon] = bbox;
    const query = `
      [out:json][timeout:25];
      (
        way["wheelchair"="yes"](${minLat},${minLon},${maxLat},${maxLon});
        node["wheelchair"="yes"](${minLat},${minLon},${maxLat},${maxLon});
      );
      out body;
      >;
      out skel qt;
    `;
    const response = await axios.post('https://overpass-api.de/api/interpreter', query);
    return response.data;
  },

  /**
   * Fetches physical barriers (steps, narrow paths) within a bounding box.
   * @param {Array<number>} bbox - [minLat, minLon, maxLat, maxLon]
   * @returns {Promise<Object>} GeoJSON data
   */
  fetchBarriers: async (bbox) => {
    const [minLat, minLon, maxLat, maxLon] = bbox;
    const query = `
      [out:json][timeout:25];
      (
        node["barrier"](${minLat},${minLon},${maxLat},${maxLon});
        node["kerb"="raised"](${minLat},${minLon},${maxLat},${maxLon});
        way["width"]["width"~"^[0-1](\\.[0-9]+)?$"](${minLat},${minLon},${maxLat},${maxLon});
      );
      out body;
      >;
      out skel qt;
    `;
    const response = await axios.post('https://overpass-api.de/api/interpreter', query);
    return response.data;
  },

  /**
   * Fetches Points of Interest (POIs) with accessibility tags.
   * @param {Array<number>} bbox - [minLat, minLon, maxLat, maxLon]
   * @returns {Promise<Object>} GeoJSON data
   */
  fetchPOIs: async (bbox) => {
    const [minLat, minLon, maxLat, maxLon] = bbox;
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"](${minLat},${minLon},${maxLat},${maxLon});
        node["shop"](${minLat},${minLon},${maxLat},${maxLon});
      );
      out body;
      >;
      out skel qt;
    `;
    const response = await axios.post('https://overpass-api.de/api/interpreter', query);
    return response.data;
  }
};

export default osmFetcher;
