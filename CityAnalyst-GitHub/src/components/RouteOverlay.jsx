import React from 'react';
import { Polyline } from 'react-leaflet';
import PropTypes from 'prop-types';

/**
 * Draws accessible route paths between coordinates.
 */
const RouteOverlay = ({ points, color = '#3b82f6', weight = 5 }) => {
  if (!points || points.length < 2) return null;

  return (
    <Polyline
      positions={points}
      pathOptions={{
        color,
        weight,
        opacity: 0.7,
        lineJoin: 'round'
      }}
    />
  );
};

RouteOverlay.propTypes = {
  /** Array of [lat, lng] coordinates */
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /** Color of the polyline */
  color: PropTypes.string,
  /** Weight of the polyline */
  weight: PropTypes.number,
};

export default RouteOverlay;
