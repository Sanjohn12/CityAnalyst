# API Reference

## AccessMap (Component)

| Prop | Type | Default | Description |
|---|---|---|---|
| `center` | `Array<number>` | `[51.16, 10.45]` | Initial center [lat, lng]. |
| `zoom` | `number` | `6` | Initial zoom level. |
| `activeOverlay` | `'kde' \| 'landuse' \| null` | `null` | Active raster overlay. |
| `kdeRaster` | `georaster` | `null` | KDE raster object. |
| `landUseRaster` | `georaster` | `null` | Land Mix raster object. |
| `isochrone` | `GeoJSON` | `null` | Travel-time polygon. |

## Spatial Engine

### runSpatialAnalysis(geometry, servicePoints, kdeRaster, options)

Calculates the urban accessibility score.

**Returns:**
- `score`: 0-100 value.
- `count`: Physical service count.
- `dist`: Categorical distribution.
- `breakdown`: Component-wise scores (density, quantity, diversity).

## Components

- `DensityLayer`: Renders KDE rasters.
- `LandUseLayer`: Renders Land Use Mix rasters.
- `AccessibilityGraph`: Radar chart for distribution.
