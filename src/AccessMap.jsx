import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import DensityLayer from './components/DensityLayer';
import LandUseLayer from './components/LandUseLayer';
import IsochroneLayer from './components/IsochroneLayer';

/**
 * CityAnalyst - Professional map component for urban intelligence.
 */
const AccessMap = ({
  center = [51.1657, 10.4515],
  zoom = 6,
  kdeRaster = null,
  landUseRaster = null,
  activeOverlay = null, // 'kde' | 'landuse' | null
  isochrone = null,
  theme = 'light',
  children
}) => {
  const tileUrl = theme === 'dark' 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url={tileUrl} />
        
        <DensityLayer 
          raster={kdeRaster} 
          visible={activeOverlay === 'kde'} 
        />
        
        <LandUseLayer 
          raster={landUseRaster} 
          visible={activeOverlay === 'landuse'} 
        />

        <IsochroneLayer geometry={isochrone} />

        {children}
      </MapContainer>
    </div>
  );
};

AccessMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  kdeRaster: PropTypes.object,
  landUseRaster: PropTypes.object,
  activeOverlay: PropTypes.oneOf(['kde', 'landuse']),
  isochrone: PropTypes.object,
  theme: PropTypes.oneOf(['light', 'dark']),
  children: PropTypes.node,
};

export default AccessMap;
