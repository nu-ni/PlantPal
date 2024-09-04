// Nino Snapshot Test
import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '@/app/(tabs)';


describe('Index Component', () => {
  it('matches the snapshot', () => {
    const tree = render(<Index />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
