# Methodology: Scoring the 15-Minute City

CityAnalyst calculates an **Accessibility Score** (0-100) to determine how well a location meets the "15-Minute City" criteria.

## The Scoring Algorithm

The final score is a weighted sum of three primary components:

### 1. Urban Density (40%)
Based on **Kernel Density Estimation (KDE)**.
- **Data Source**: High-resolution rasters (`.tif`) representing service concentrations.
- **Calculation**: Spatial mean of the KDE layer within a 15-minute walking isochrone.
- **Logic**: A higher density of overall urban activity positively correlates with better accessibility.

### 2. Service Quantity (30%)
A logarithmic scale of the physical count of services.
- **Calculation**: `15 * log10(WeightedCount + 1)`
- **Weighting**: Each service has a `major_wt` (e.g., Hospital > Kiosk) and a `minor_wt`.
- **Logic**: Diminishing returns after a certain threshold of infrastructure.

### 3. Service Diversity (30%)
Measures the variety of service categories.
- **Logic**: A neighborhood with 100 cafes but no pharmacies is less "15-minute" than one with 10 diverse services.
- **Calculation**: `(CategoricalCount / TargetDiversity) * 30`
- **Goal**: Encourage a healthy mix of Education, Healthcare, Food, and Leisure.

## Dynamic Analysis Parameters

### Travel Time Range (Isochrones)
The "15-minute" limit is a dynamic variable.
- **Logic**: Changing the travel time (e.g., to 20 mins) expands the Isochrone geometry.
- **Impact**: The spatial engine re-fetches points and re-calculates the intersection, often leading to a higher score as more services are "captured."

### Batch Radius Logic
When performing multi-site analysis, the **Batch Radius** determines the search area around each coordinate.
- **Constraint**: Designed to prevent overlapping analysis areas when coordinates are close together.
- **Scoring**: Sites are compared using identical radius parameters to ensure the leaderboard is scientifically fair.

## Weight Visibility & Manual Input

The system uses a transparent weighting model.
- **Inspector**: Every score component (KDE, Qty, Div) is broken down into its raw contribution.
- **Manual Overrides**: Users can input custom weights to simulate specific urban personas (e.g., an "Edu-centric" score for university planning).
