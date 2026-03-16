import React from 'react';
import { render } from '@testing-library/react';
import AccessMap from './AccessMap';

// Mock Leaflet as it doesn't work well in JSDOM
jest.mock('react-leaflet', () => ({
  MapContainer: () => <div data-testid="map-container" />,
  TileLayer: () => null,
  useMap: () => ({}),
}));

describe('AccessMap Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<AccessMap />);
    expect(getByTestId('map-container')).toBeDefined();
  });
});
