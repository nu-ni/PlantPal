import React from 'react';
import CollectionCard from '../CollectionCard';
import { render, fireEvent } from "@testing-library/react-native";
import renderer from 'react-test-renderer';
import { PlantCollection } from '@/data/models';

// prepare dummy data
const plantCollectionDummy: PlantCollection = {
    id: 1,
    title: "Collection 1",
    lastActive: new Date(),
}

describe("<CollectionCard />", () => {
    // Setup
    const onItemSelectedMock = jest.fn();
    const card = <CollectionCard item={plantCollectionDummy} isSelected={true} onItemSelected={onItemSelectedMock} />;

    // Snapshot test
    it("renders correctly and matches the snapshot", () => {
        const tree = renderer.create(card).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // tests
    it("renders correctly with correct item title displayed", () => {
        const { getByText } = render(card);
        const titleElement = getByText(plantCollectionDummy.title);

        expect(titleElement.props.children).toEqual(plantCollectionDummy.title);
    });

    it("calls onItemSelected when card is pressed", () => {
        const { getByText } = render(card);
        const cardComponent = getByText(plantCollectionDummy.title);

        fireEvent.press(cardComponent);
        expect(onItemSelectedMock).toHaveBeenCalledTimes(1);
    });
});
