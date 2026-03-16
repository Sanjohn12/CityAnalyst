import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';

/**
 * Renders individual Points of Interest with accessibility metadata.
 */
const POIMarker = ({ position, properties, onClick }) => {
  const isAccessible = properties.wheelchair === 'yes';
  
  const icon = new L.Icon({
    iconUrl: isAccessible 
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Marker position={position} icon={icon} eventHandlers={{ click: onClick }}>
      <Tooltip>
        <b>{properties.name || 'Points of Interest'}</b><br />
        Category: {properties.amenity || properties.shop || 'Other'}<br />
        Wheelchair: {properties.wheelchair || 'unknown'}
      </Tooltip>
    </Marker>
  );
};

POIMarker.propTypes = {
  /** Coordinate array [lat, lng] */
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Properties of the POI */
  properties: PropTypes.object.isRequired,
  /** Click handler function */
  onClick: PropTypes.func,
};

export default POIMarker;
