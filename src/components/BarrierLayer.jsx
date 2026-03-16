import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import useAccessibilityData from '../hooks/useAccessibilityData';
import useMapBounds from '../hooks/useMapBounds';
import PropTypes from 'prop-types';

/**
 * Renders physical barriers (steps, narrow paths) as markers.
 */
const BarrierLayer = ({ visible }) => {
  const bounds = useMapBounds();
  const { data } = useAccessibilityData(bounds, { enabled: visible, type: 'barrier' });

  if (!visible || !data) return null;

  const barrierIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <>
      {data.features.map((f, i) => (
        <Marker
          key={`barrier-${i}`}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
          icon={barrierIcon}
        >
          <Tooltip>
            <b>Barrier Detected</b><br />
            Type: {f.properties.barrier || f.properties.kerb || 'Narrow Path'}<br />
            {f.properties.width && `Width: ${f.properties.width}m`}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};

BarrierLayer.propTypes = {
  /** Whether the layer is visible on the map */
  visible: PropTypes.bool.isRequired,
};

export default BarrierLayer;
