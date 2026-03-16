import React from 'react';
import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';

/**
 * Visualization of travel-time polygons (Isochrones).
 */
const IsochroneLayer = ({ geometry, color = '#3b82f6', opacity = 0.1 }) => {
  if (!geometry) return null;

  return (
    <GeoJSON
      key={JSON.stringify(geometry)}
      data={geometry}
      style={{
        color,
        weight: 2,
        fillOpacity: opacity
      }}
    />
  );
};

IsochroneLayer.propTypes = {
  /** GeoJSON geometry */
  geometry: PropTypes.object,
  /** Border color */
  color: PropTypes.string,
  /** Fill opacity */
  opacity: PropTypes.number,
};

export default IsochroneLayer;
