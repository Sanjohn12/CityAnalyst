# Features Encyclopedia: CityAnalyst

This document provides a granular technical description of every feature available in the CityAnalyst platform.

![CityAnalyst Primary Interface](../assets/first%20entering%20image.png)


## 1. Geospatial Foundation
- **Germany Boundary Layer**: High-resolution GeoJSON boundaries for the Federal Republic of Germany.
- **All Province Support**: Specialized data buckets for all 16 German states (Bavaria, Berlin, etc.).
- **Automatic Province Context**: The system detects your search location and loads the corresponding province's KDE and Land Use rasters automatically.

## 2. Interactive Map Overlays
![Heatmap Visualization](../assets/Kde.png)
- **Heat Map (KDE)**: Renders the concentrations of urban activity. High vibrancy gradients identify "hotspots."
- **Land Use Mix Entropy**: Visualizes the entropy of land usage. Areas with mixed residential/commercial are highlighted.
![Land Use Entropy](../assets/Land%20use%20mix.png)
- **POI Toggle**: A master switch to turn Point-of-Interest markers on or off to declutter the view.
![Spatial Infrastructure](../assets/Show%20Berlin%20Pois.png)
- **Grid System**: A tile-based analysis layer where each cell can be individually analyzed.
![Grid Based Analysis](../assets/grid%20enabled%20after.png)


## 3. The 15-Minute City Engine
![Isochrone Mobility Map](../assets/isochrone.png)
- **Isochrone Geometry**: Large-polygon rendering for walking and cycling ranges.
- **Mobility Options**: Toggle between walking, cycling, and driving (if enabled) profile sets.
- **Travel Time Adjustment**: A slider to change the analysis window from 5 minutes to 60 minutes.


## 4. Analytical Parameters
- **Batch Radius Change**: Adjust the radius for batch-wise coordinate analysis (e.g., analyzing 500m vs 1km).
- **Manual Weight Input**: Users can explicitly type or slide the importance of categories (e.g., set "Healthcare" to 5.0 and "Fast Food" to 0.5).
- **Weight Inspector**: A UI panel to view the active weights being used by the analysis engine.
![Weights Configurator](../assets/weights%20showing.png)


## 5. Strategic Intelligence (AI)
- **AI Review Suggestions**: The Gemini model reviews the spatial stats and suggests specific infrastructure additions (e.g., "Add a pharmacy at [lat, lng]").
- **Persona Insights**: Detailed narrative on who should live here (Ideal Demographics).
- **Trend Detection**: AI analysis of temporal trends (if historical data is available).

## 6. Batch & Comparative Analysis
![Batch Comparison Matrix](../assets/Batchwise%20analysis.png)
- **Ranked Leaderboard**: A sidebar that ranks multiple locations from "Top Pick" to "Least Suitable."
- **Winner Analysis**: A detailed comparative breakdown of why Point A beats Point B.


## 7. UI Experience
- **Premium Glassmorphism**: High-end UI aesthetics matching modern software standards.
- **Dark/Light Mode**: Full CSS variable support for theme switching.
- **Performant Rendering**: Canvas-based POI rendering to support 5000+ markers without UI lag.
