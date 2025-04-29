import React from "react";
import { render } from "@testing-library/react-native";
import { ResourceContainer } from "./ResourceContainer";

// Mock props
const mockItems = [
  {
    id: "1",
    companyName: "Company A",
    companyDetails: "Description A",
    companyLogo: "logo1.png",
    typeId: "1",
    information: "Information A",
    numberOfLikes: 10,
    isLiked: false,
  },
  {
    id: "2",
    companyName: "Company B",
    companyDetails: "Description B",
    companyLogo: "logo2.png",
    typeId: "2",
    information: "Information B",
    numberOfLikes: 5,
    isLiked: true,
  },
];

const mockTypes = [
  { id: "1", name: "Type A" },
  { id: "2", name: "Type B" },
];

const mockHandleOnView = jest.fn();
const mockHandleOnLike = jest.fn();

describe("ResourceContainer", () => {
  test("renders company names correctly", () => {
    const { getByText } = render(
      <ResourceContainer
        items={mockItems}
        types={mockTypes}
        numberOfUsers={100}
        handleOnView={mockHandleOnView}
        handleOnLike={mockHandleOnLike}
      />
    );

    expect(getByText("Company A")).toBeTruthy();
    expect(getByText("Company B")).toBeTruthy();
  });

  test("renders company descriptions correctly", () => {
    const { getByText } = render(
      <ResourceContainer
        items={mockItems}
        types={mockTypes}
        numberOfUsers={100}
        handleOnView={mockHandleOnView}
        handleOnLike={mockHandleOnLike}
      />
    );

    expect(getByText("Description A")).toBeTruthy();
    expect(getByText("Description B")).toBeTruthy();
  });

  test("renders resource types correctly", () => {
    const { getByText } = render(
      <ResourceContainer
        items={mockItems}
        types={mockTypes}
        numberOfUsers={100}
        handleOnView={mockHandleOnView}
        handleOnLike={mockHandleOnLike}
      />
    );

    expect(getByText("Type A")).toBeTruthy();
    expect(getByText("Type B")).toBeTruthy();
  });

  test("renders information correctly", () => {
    const { getByText } = render(
      <ResourceContainer
        items={mockItems}
        types={mockTypes}
        numberOfUsers={100}
        handleOnView={mockHandleOnView}
        handleOnLike={mockHandleOnLike}
      />
    );

    expect(getByText("Information A")).toBeTruthy();
    expect(getByText("Information B")).toBeTruthy();
  });

  test("renders number of likes correctly", () => {
    const { getByText } = render(
      <ResourceContainer
        items={mockItems}
        types={mockTypes}
        numberOfUsers={100}
        handleOnView={mockHandleOnView}
        handleOnLike={mockHandleOnLike}
      />
    );

    expect(getByText("10")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  test("renders like button", () => {
    const { getByText } = render(
      <ResourceContainer
        items={mockItems}
        types={mockTypes}
        numberOfUsers={100}
        handleOnView={mockHandleOnView}
        handleOnLike={mockHandleOnLike}
      />
    );

    expect(getByText("Like")).toBeTruthy();
    expect(getByText("Liked")).toBeTruthy();
  });
});
