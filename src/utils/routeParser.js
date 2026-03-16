import * as turf from '@turf/turf';

/**
 * Utility to parse raw OSM JSON data into usable GeoJSON objects.
 */
const routeParser = {
  /**
   * Converts OSM JSON to GeoJSON.
   * @param {Object} osmData - Raw OSM JSON from Overpass API
   * @returns {Object} FeatureCollection
   */
  parseToGeoJSON: (osmData) => {
    if (!osmData || !osmData.elements) return turf.featureCollection([]);

    const nodes = new Map();
    osmData.elements.forEach(el => {
      if (el.type === 'node') nodes.set(el.id, [el.lon, el.lat]);
    });

    const features = [];
    osmData.elements.forEach(el => {
      if (el.type === 'way' && el.nodes) {
        const coordinates = el.nodes.map(nodeId => nodes.get(nodeId)).filter(Boolean);
        if (coordinates.length > 1) {
          features.push(turf.lineString(coordinates, el.tags || {}));
        }
      } else if (el.type === 'node') {
        features.push(turf.point([el.lon, el.lat], el.tags || {}));
      }
    });

    return turf.featureCollection(features);
  },

  /**
   * Extracts specific route paths from GeoJSON.
   * @param {Object} geoJson - FeatureCollection
   * @returns {Array<Object>} List of route features
   */
  extractRoutes: (geoJson) => {
    return geoJson.features.filter(f => f.geometry.type === 'LineString');
  }
};

export default routeParser;
