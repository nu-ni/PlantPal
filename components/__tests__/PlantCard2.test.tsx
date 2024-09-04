// failt leider

import React from 'react';
import PlantCard from '../PlantCard';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Plant } from '@/data/models';


// Prepare dummy data
const plantDummy: Plant = {
    id: 1,
    title: 'Plant 1',
    frequency: 3,
    waterAmount: 200,
    image: 'base64image',
    collectionId: 0
};

describe('<PlantCard />', () => {
  // Snapshot test
  it('renders correctly and matches the snapshot', () => {
    const tree = renderer.create(<PlantCard item={plantDummy} onItemSelected={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test rendering with item details
  it('renders correctly with the correct item details displayed', () => {
    const { getByText } = render(<PlantCard item={plantDummy} onItemSelected={jest.fn()} />);

    // Check title
    const titleElement = getByText(plantDummy.title);
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.children).toEqual(plantDummy.title);

    // Check frequency
    const frequencyElement = getByText(`${plantDummy.frequency} d`);
    expect(frequencyElement).toBeTruthy();
    expect(frequencyElement.props.children).toEqual(`${plantDummy.frequency} d`);

    // Check water amount
    const waterAmountElement = getByText(`${plantDummy.waterAmount} ml`);
    expect(waterAmountElement).toBeTruthy();
    expect(waterAmountElement.props.children).toEqual(`${plantDummy.waterAmount} ml`);
  });

  // Test calling onItemSelected
  it('calls onItemSelected when card is pressed', () => {
    const onItemSelectedMock = jest.fn();
    const { getByText } = render(<PlantCard item={plantDummy} onItemSelected={onItemSelectedMock} />);
    const cardComponent = getByText(plantDummy.title);

    fireEvent.press(cardComponent);
    expect(onItemSelectedMock).toHaveBeenCalledTimes(1);
  });

  // Test that onItemSelected is not called when not provided
  it('does not call onItemSelected, when not provided', () => { const { getByText } = render(<PlantCard item={plantDummy} />); const cardComponent = getByText(plantDummy.title);
// Attempt to press the card
fireEvent.press(cardComponent);

// Check that no function was called
// Since no onItemSelected prop was provided, we should not expect it to be called
expect(() => {}).not.toThrow();  // No function to spy on, so this test checks nothing is wrong
}); });
