import React from 'react';
import { AccessMap } from '../src';

/**
 * Basic usage of AccessMap with defaults.
 */
const BasicMapExample = () => {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h1>Basic Accessibility Map</h1>
      <AccessMap 
        center={[52.52, 13.405]} // Berlin
        zoom={14}
      />
    </div>
  );
};

export default BasicMapExample;
