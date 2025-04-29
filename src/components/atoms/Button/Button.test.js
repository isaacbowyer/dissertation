import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("<ButtonSolid>", () => {
  test("renders text correctly", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button.Solid text="Solid Button" onPress={onPressMock} />
    );
    expect(getByText("Solid Button")).toBeInTheDocument();
  });

  test("fires onPress callback when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button.Solid text="Solid Button" onPress={onPressMock} />
    );
    fireEvent.click(getByText("Solid Button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  test("disables the button when isDisabled prop is true", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button.Solid
        text="Solid Button"
        onPress={onPressMock}
        isDisabled={true}
      />
    );
    const button = getByText("Solid Button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  // Add more tests for other props and behaviors as needed
});

describe("ButtonOutline", () => {
  test("renders text correctly", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button.Outline text="Outline Button" onPress={onPressMock} />
    );
    expect(getByText("Outline Button")).toBeInTheDocument();
  });

  test("fires onPress callback when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button.Outline text="Outline Button" onPress={onPressMock} />
    );
    fireEvent.click(getByText("Outline Button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  test("disables the button when isDisabled prop is true", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button.Outline
        text="Outline Button"
        onPress={onPressMock}
        isDisabled={true}
      />
    );
    const button = getByText("Outline Button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
