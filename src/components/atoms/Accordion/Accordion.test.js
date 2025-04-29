import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Accordion } from "./Accordion";

describe("<Accordion>", () => {
  const mockProps = {
    title: "Test Accordion",
    hiddenSection: <Text>Hidden Section Content</Text>,
    isDisabled: false,
  };

  it("renders correctly", () => {
    const { getByText } = render(<Accordion {...mockProps} />);

    expect(getByText("Test Accordion")).toBeDefined();
  });

  it("expands when clicked", async () => {
    const { getByText, queryByText } = render(<Accordion {...mockProps} />);

    expect(queryByText("Hidden Section Content")).toBeNull();

    fireEvent.press(getByText("Test Accordion"));

    expect(getByText("Hidden Section Content")).toBeDefined();
  });

  it("collapses when clicked again", async () => {
    const { getByText } = render(<Accordion {...mockProps} />);

    fireEvent.press(getByText("Test Accordion"));
    fireEvent.press(getByText("Test Accordion"));

    expect(queryByText("Hidden Section Content")).toBeNull();
  });

  it("remains expanded when disabled", async () => {
    const { getByText } = render(
      <Accordion {...mockProps} isDisabled={true} />
    );

    fireEvent.press(getByText("Test Accordion"));

    expect(getByText("Hidden Section Content")).toBeDefined();
  });

  it("does not expand when disabled", async () => {
    const { getByText } = render(
      <Accordion {...mockProps} isDisabled={true} />
    );

    fireEvent.press(getByText("Test Accordion"));

    expect(queryByText("Hidden Section Content")).toBeNull();
  });
});
