import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { HorizitonalCard } from "./HorizitonalCard";
import { UI } from "../../../data/ui";

describe("<HorizitonalCard>", () => {
  const mockProps = {
    label: "Test Label",
    description: "Test Description",
    image: UI.WORK_RESOURCES[0].image,
    buttonLabel: "Test Button",
    handleOnPress: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(
      <HorizitonalCard {...mockProps} />
    );

    expect(getByText("Test Label")).toBeDefined();
    expect(getByText("Test Description")).toBeDefined();
    expect(getByAltText("Test Label Card Image")).toBeDefined();
    expect(getByText("Test Button")).toBeDefined();
  });

  it("calls handleOnPress when button is clicked", async () => {
    const { getByText } = render(<HorizitonalCard {...mockProps} />);

    fireEvent.press(getByText("Test Button"));
    await waitFor(() => expect(mockProps.handleOnPress).toHaveBeenCalled());
  });

  it("renders loading state when isLoading is true", () => {
    const { getByTestId } = render(
      <HorizitonalCard {...mockProps} isLoading={true} />
    );

    expect(getByTestId("button-spinner")).toBeDefined();
  });

  it("does not render loading state when isLoading is false", () => {
    const { queryByTestId } = render(
      <HorizitonalCard {...mockProps} isLoading={false} />
    );

    expect(queryByTestId("button-spinner")).toBeNull();
  });
});
