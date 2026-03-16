import React from 'react';
import { GeoJSON } from 'react-leaflet';
import useAccessibilityData from '../hooks/useAccessibilityData';
import useMapBounds from '../hooks/useMapBounds';
import PropTypes from 'prop-types';

/**
 * Renders wheelchair-accessible routes on the map.
 * Fetches data dynamically from OSM based on map movement.
 */
const WheelchairLayer = ({ visible }) => {
  const bounds = useMapBounds();
  const { data, loading } = useAccessibilityData(bounds, { enabled: visible, type: 'wheelchair' });

  if (!visible || !data) return null;

  return (
    <GeoJSON
      key={`wheelchair-${loading ? 'loading' : 'ready'}`}
      data={data}
      style={{
        color: '#10b981',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 10'
      }}
    />
  );
};

WheelchairLayer.propTypes = {
  /** Whether the layer is visible on the map */
  visible: PropTypes.bool.isRequired,
};

export default WheelchairLayer;
