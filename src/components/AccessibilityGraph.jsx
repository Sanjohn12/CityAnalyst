import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

/**
 * Visualization for service distribution in an urban area.
 */
const AccessibilityGraph = ({ serviceDistribution, color = '#6366f1' }) => {
  if (!serviceDistribution || Object.keys(serviceDistribution).length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
        No spatial data available.
      </div>
    );
  }

  const data = Object.entries(serviceDistribution).map(([name, val]) => ({
    subject: name.charAt(0).toUpperCase() + name.slice(1),
    A: val.total,
    fullMark: 10,
  }));

  return (
    <div style={{ width: '100%', height: 250, marginTop: '10px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
          <Radar
            name="Services"
            dataKey="A"
            stroke={color}
            fill={color}
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

AccessibilityGraph.propTypes = {
  /** Service distribution object { category: { total: number } } */
  serviceDistribution: PropTypes.object.isRequired,
  /** Primary color for the radar chart */
  color: PropTypes.string,
};

export default AccessibilityGraph;
