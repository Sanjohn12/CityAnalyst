# Technical Architecture

CityAnalyst is built with a modern React/Leaflet stack designed for high-performance geospatial analysis.

## Core Modules

### 1. The Analysis Engine (`src/utils/analysisEngine.js`)
The "brain" of the application. It performs massive geometric intersections between thousands of points and complex polygons.
- **Optimization**: Uses spatial indexing and bounding box pre-filtering to maintain 60fps performance during map interaction.

### 2. Raster Logic
- **`DensityLayer`**: Custom implementation to map raw pixel values from GeoTIFFs to high-vibrancy color gradients.
- **`LandUseLayer`**: Synchronized layer switching to prevent raster overlap and race conditions.

### 3. State Management
The application uses a reactive loop:
1.  **User Input**: Map click or search.
2.  **Isochrone Fetch**: Async call to OpenRouteService.
3.  **Spatial Analysis**: Synchronous intersection with cached GeoJSON and Rasters.
4.  **UI Sync**: Update Recharts (Radar Chart) and AI Strategic reports.

## Tech Stack

- **Frontend**: React, Vite
- **Mapping**: Leaflet, React-Leaflet
- **Geometry**: @turf/turf, Geoblaze
- **Data**: Axios, OpenStreetMap (Overpass API)
- **Charts**: Recharts
- **AI**: Gemini API (via Netlify Functions)
