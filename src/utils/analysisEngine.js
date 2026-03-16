import * as turf from '@turf/turf';
import geoblaze from 'geoblaze';

/**
 * Core spatial analysis engine for calculating urban accessibility scores.
 * Ported from CityAnalyst application.
 */
export const runSpatialAnalysis = (geometry, servicePoints, fullKdeRaster, options = {}) => {
  const { 
    customWeights = {}, 
    isCustomWeightMode = false,
    maxDiversity = 6,
    maxQuantityScore = 30
  } = options;

  if (!geometry || !servicePoints?.features || !fullKdeRaster) {
    return {
      score: 0,
      count: 0,
      dist: {},
      breakdown: { density: 0, quantity: 0, diversity: 0 },
    };
  }

  const poly = turf.feature(geometry);
  const bbox = turf.bbox(poly);
  let totalWeightedScore = 0;
  let physicalCount = 0;
  const distribution = {};

  // Filter points in bounding box first for performance
  const pointsInBox = servicePoints.features.filter((f) => {
    const [lng, lat] = f.geometry.coordinates;
    return lng >= bbox[0] && lat >= bbox[1] && lng <= bbox[2] && lat <= bbox[3];
  });

  pointsInBox.forEach((f) => {
    if (turf.booleanPointInPolygon(f, poly)) {
      const p = f.properties;
      const major = (p.major_cat || 'other').trim().toLowerCase();

      const effectiveMajorWt = isCustomWeightMode && customWeights[major] !== undefined
        ? customWeights[major]
        : (Number(p.major_wt) || 1);

      totalWeightedScore += effectiveMajorWt * (Number(p.minor_wt) || 1);
      physicalCount++;

      const sub = (p.fclass || 'unspecified').trim();
      if (!distribution[major]) {
        distribution[major] = { total: 0, major_wt: p.major_wt || 1, subs: {} };
      }
      distribution[major].total++;
      
      if (!distribution[major].subs[sub]) {
        distribution[major].subs[sub] = { count: 0, weight: p.minor_wt || 1 };
      }
      distribution[major].subs[sub].count += 1;
    }
  });

  let avgKDE = 0;
  try {
    // Requires geoblaze
    const mean = geoblaze.mean(fullKdeRaster, poly);
    avgKDE = mean[0] || 0;
  } catch (err) {
    avgKDE = 0;
  }

  // Scoring Components
  const densityComp = Math.sqrt(Math.min(avgKDE / 0.15, 1)) * 40;
  const quantityComp = Math.min(15 * Math.log10(totalWeightedScore + 1), maxQuantityScore);
  
  const significantCategories = Object.keys(distribution).filter(
    (c) => c !== "other" && distribution[c].total >= 1
  ).length;
  const diversityComp = Math.min((significantCategories / maxDiversity) * 30, 30);

  return {
    score: Number(Math.min(densityComp + quantityComp + diversityComp, 100).toFixed(1)),
    count: physicalCount,
    dist: distribution,
    breakdown: {
      density: densityComp,
      quantity: quantityComp,
      diversity: diversityComp,
    }
  };
};
