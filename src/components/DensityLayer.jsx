import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import PropTypes from 'prop-types';

/**
 * Kernel Density Estimation (KDE) layer for visualizing urban service density.
 */
const DensityLayer = ({ raster, opacity = 0.65, visible = true }) => {
  const map = useMap();
  const layerRef = useRef(null);

  const getKdeColor = (val) => {
    if (val <= 0 || isNaN(val)) return "transparent";
    if (val < 0.0005) return "#3b0f70";
    if (val < 0.003) return "#1f6ae1";
    if (val < 0.007) return "#00b4d8";
    if (val < 0.02) return "#52c569";
    if (val < 0.05) return "#f4e61e";
    if (val < 0.1) return "#f8961e";
    return "#d62828";
  };

  useEffect(() => {
    if (!map || !raster || !visible) {
      if (layerRef.current && map.hasLayer(layerRef.current)) {
        map.removeLayer(layerRef.current);
      }
      return;
    }

    try {
      const layer = new GeoRasterLayer({
        georaster: raster,
        opacity,
        pixelValuesToColorFn: (v) => getKdeColor(v[0]),
        resolution: 96,
      });

      layer.addTo(map);
      layerRef.current = layer;

      return () => {
        if (layerRef.current) {
          map.removeLayer(layerRef.current);
        }
      };
    } catch (err) {
      console.error("DensityLayer render error:", err);
    }
  }, [map, raster, visible, opacity]);

  return null;
};

DensityLayer.propTypes = {
  /** georaster object */
  raster: PropTypes.object,
  /** Layer opacity */
  opacity: PropTypes.number,
  /** Visibility toggle */
  visible: PropTypes.bool,
};

export default DensityLayer;
