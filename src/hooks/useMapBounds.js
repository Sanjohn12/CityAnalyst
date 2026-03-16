import { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

/**
 * Custom hook to track and debounce current map bounding box.
 * @returns {Array<number>|null} [minLat, minLon, maxLat, maxLon]
 */
const useMapBounds = () => {
  const [bounds, setBounds] = useState(null);

  const map = useMapEvents({
    moveend: () => {
      const b = map.getBounds();
      setBounds([
        b.getSouth(),
        b.getWest(),
        b.getNorth(),
        b.getEast()
      ]);
    }
  });

  useEffect(() => {
    // Initial bounds
    const b = map.getBounds();
    setBounds([
      b.getSouth(),
      b.getWest(),
      b.getNorth(),
      b.getEast()
    ]);
  }, [map]);

  return bounds;
};

export default useMapBounds;
