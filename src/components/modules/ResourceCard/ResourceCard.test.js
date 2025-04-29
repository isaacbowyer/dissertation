import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ResourceCard } from "./ResourceCard";

const mockProps = {
  companyName: "Company A",
  companyDescription: "Description A",
  imageUri: "image_uri",
  resourceType: "Type A",
  resourceInformation: "Information A",
  numberOfUsers: 100,
  numberOfLikes: 50,
  isLiked: false,
  handleOnLike: jest.fn(),
  handleOnView: jest.fn(),
};

describe("ResourceCard", () => {
  test("renders company name and description correctly", () => {
    const { getByText } = render(<ResourceCard {...mockProps} />);
    expect(getByText("Company A")).toBeTruthy();
    expect(getByText("Description A")).toBeTruthy();
  });

  test("renders resource type section correctly", () => {
    const { getByText } = render(<ResourceCard {...mockProps} />);
    expect(getByText("Resource Type")).toBeTruthy();
    expect(getByText("Type A")).toBeTruthy();
  });

  test("renders resource information section correctly", () => {
    const { getByText } = render(<ResourceCard {...mockProps} />);
    expect(getByText("Resource Information")).toBeTruthy();
    expect(getByText("Information A")).toBeTruthy();
  });

  test("renders favourite indicator section correctly if users liked it", () => {
    const { getByText } = render(
      <ResourceCard {...mockProps} numberOfLikes={0} />
    );
    expect(getByText("50% of users have liked this resource")).toBeTruthy();
  });

  test("renders favourite indicator section correctly if no users liked it", () => {
    const { getByText } = render(<ResourceCard {...mockProps} />);
    expect(getByText("No users have liked this resource yet")).toBeTruthy();
  });

  test("calls handleOnLike when heart button is pressed", () => {
    const { getByTestId } = render(<ResourceCard {...mockProps} />);

    fireEvent.press(getByTestId("heart-button"));

    expect(mockProps.handleOnLike).toHaveBeenCalled();
  });
});
