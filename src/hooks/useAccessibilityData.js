import { useState, useEffect } from 'react';
import osmFetcher from '../utils/osmFetcher';
import routeParser from '../utils/routeParser';

/**
 * Custom hook to fetch and cache OpenStreetMap accessibility data.
 * @param {Array<number>} bounds - Current map bounding box [minLat, minLon, maxLat, maxLon]
 * @param {Object} options - { enabled: boolean, type: 'wheelchair' | 'barrier' | 'poi' }
 * @returns {Object} { data, loading, error }
 */
const useAccessibilityData = (bounds, { enabled = true, type = 'wheelchair' } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !bounds || bounds.length !== 4) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let rawData;
        switch (type) {
          case 'barrier':
            rawData = await osmFetcher.fetchBarriers(bounds);
            break;
          case 'poi':
            rawData = await osmFetcher.fetchPOIs(bounds);
            break;
          case 'wheelchair':
          default:
            rawData = await osmFetcher.fetchWheelchairData(bounds);
            break;
        }
        const geoJson = routeParser.parseToGeoJSON(rawData);
        setData(geoJson);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bounds, enabled, type]);

  return { data, loading, error };
};

export default useAccessibilityData;
