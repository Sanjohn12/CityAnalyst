import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import PropTypes from 'prop-types';

/**
 * Land Use Mix layer for visualizing urban diversity.
 */
const LandUseLayer = ({ raster, opacity = 0.65, visible = true }) => {
  const map = useMap();
  const layerRef = useRef(null);

  const getLandUseColor = (val) => {
    if (val <= 0.0 || isNaN(val)) return "transparent";
    if (val < 0.23) return "#2b83ba";
    if (val < 0.43) return "#abdda4";
    if (val < 0.63) return "#ffffbf";
    if (val < 0.84) return "#fdae61";
    return "#d7191c";
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
        pixelValuesToColorFn: (v) => getLandUseColor(v[0]),
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
      console.error("LandUseLayer render error:", err);
    }
  }, [map, raster, visible, opacity]);

  return null;
};

LandUseLayer.propTypes = {
  /** georaster object */
  raster: PropTypes.object,
  /** Layer opacity */
  opacity: PropTypes.number,
  /** Visibility toggle */
  visible: PropTypes.bool,
};

export default LandUseLayer;
