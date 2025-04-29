import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "./Input";
import { ICONS } from "../../../data/icons";

describe("<Input>", () => {
  const mockProps = {
    label: "Test Label",
    value: "",
    onChange: jest.fn(),
    icon: ICONS.SEARCH,
    isDisabled: false,
    type: "underlined",
    placeholder: "Test Placeholder",
    helpText: "Test help text",
  };

  it("renders correctly", () => {
    const { getByPlaceholderText } = render(<Input {...mockProps} />);

    expect(getByPlaceholderText("Test Placeholder")).toBeDefined();
  });

  it("calls onChange handler when input value changes", async () => {
    const inputElement = getByPlaceholderText("Test Placeholder");

    fireEvent.changeText(inputElement, "test value");

    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it("renders label when provided", () => {
    const { getByText } = render(<Input {...mockProps} />);

    expect(getByText("Test Label")).toBeDefined();
  });

  it("renders icon when provided", () => {
    const { getByTestId } = render(<Input {...mockProps} />);

    expect(getByTestId("input-icon")).toBeDefined();
  });

  it("renders help text when provided and input is touched", () => {
    const { getByText } = render(<Input {...mockProps} />);

    fireEvent.changeText(
      getByPlaceholderText("Test Placeholder"),
      "test value"
    );

    expect(getByText("Test help text")).toBeDefined();
  });

  it("does not render help text when input is not touched", () => {
    const { queryByText } = render(<Input {...mockProps} />);

    expect(queryByText("Test help text")).toBeNull();
  });

  it("does not render help text when helpText is not provided", () => {
    const { queryByText } = render(<Input {...mockProps} helpText="" />);

    fireEvent.changeText(
      getByPlaceholderText("Test Placeholder"),
      "test value"
    );

    expect(queryByText("Test help text")).toBeNull();
  });

  it("disables input when isDisabled is true", () => {
    const { getByPlaceholderText } = render(
      <Input {...mockProps} isDisabled={true} />
    );

    expect(getByPlaceholderText("Test Placeholder")).toBeDisabled();
  });
});
