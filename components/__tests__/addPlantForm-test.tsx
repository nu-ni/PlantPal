import React from "react";
import { AddPlantForm } from "../addPlantForm";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

// TODO: snapshot
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AddPlantForm
        onButtonClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// postitive
it("should show camera view when the camera icon is clicked", () => {
  const { getByText, getByTestId } = render(
    <AddPlantForm onButtonClick={jest.fn()} />
  );

  const cameraIcon = getByTestId("camera-icon");
  fireEvent.press(cameraIcon);

  expect(getByText("Flip Camera")).toBeTruthy();
  expect(getByText("Take Photo")).toBeTruthy();
});

// negative
it("should display an alert when plant name is empty", async () => {
  jest.spyOn(Alert, "alert");
  const { getByText } = render(<AddPlantForm onButtonClick={jest.fn()} />);

  const saveButton = getByText("Save");
  fireEvent.press(saveButton);

  await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation Error",
      "Plant Name cannot be empty."
    );
  });
});