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
  // Setup
  const onItemSelectedMock = jest.fn();
  const card = <PlantCard item={plantDummy} onItemSelected={onItemSelectedMock} />;

  // Snapshot test
  it('renders correctly and matches the snapshot', () => {
    const tree = renderer.create(card).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Tests
  it('renders correctly with the correct item details displayed', () => {
    const { getByText } = render(card);

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

  it('calls onItemSelected when card is pressed', () => {
    const { getByText } = render(card);
    const cardComponent = getByText(plantDummy.title);

    fireEvent.press(cardComponent);
    expect(onItemSelectedMock).toHaveBeenCalledTimes(1);
  });
});
