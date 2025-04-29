import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WorkResourcesSection from "./WorkResourcesSection";

const mockResources = [
  {
    id: "1",
    typeId: "type1",
    link: "link1",
    information: "info1",
    companyName: "company1",
    companyDetails: "details1",
    companyLogo: "logo1",
    createdAt: new Date(),
    isLiked: false,
    likedId: "",
    numberOfLikes: 0,
  },
  {
    id: "2",
    typeId: "type2",
    link: "link2",
    information: "info2",
    companyName: "company2",
    companyDetails: "details2",
    companyLogo: "logo2",
    createdAt: new Date(),
    isLiked: true,
    likedId: "1",
    numberOfLikes: 1,
  },
];

const defaultProps = {
  totalPages: 3,
  currentPage: 1,
  count: 10,
  limit: 5,
  numberOfUsers: 5,
  resources: mockResources,
  isFetching: false,
  tagList: ["tag1", "tag2"],
  source: "source1",
  types: [
    { id: "type1", name: "Type 1" },
    { id: "type2", name: "Type 2" },
  ],
  title: "Test Title",
  screenState: "results",
  handleOnView: jest.fn(),
  handleOnLike: jest.fn(),
  handleOnChange: jest.fn(),
};

describe("WorkResourcesSection", () => {
  test("renders correctly with results screen state", () => {
    const { getByText, getByTestId } = render(
      <WorkResourcesSection {...defaultProps} />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Type 1")).toBeTruthy();
    expect(getByText("Type 2")).toBeTruthy();
    expect(getByText("company1")).toBeTruthy();
    expect(getByText("company2")).toBeTruthy();
    expect(getByTestId("like-button-1")).toBeTruthy();
    expect(getByTestId("like-button-2")).toBeTruthy();
  });

  test("calls handleOnLike when like button is pressed", () => {
    const { getByTestId } = render(<WorkResourcesSection {...defaultProps} />);
    fireEvent.press(getByTestId("like-button-1"));
    expect(defaultProps.handleOnLike).toHaveBeenCalledWith(mockResources[0]);
  });

  test("renders correctly with empty screen state", () => {
    const { getByText } = render(
      <WorkResourcesSection {...mockProps} screenState="empty" />
    );
    expect(
      getByText("There are no resources available for Test Title yet.")
    ).toBeTruthy();
  });

  test("renders correctly with loading screen state", () => {
    const { getByTestId } = render(
      <WorkResourcesSection {...mockProps} screenState="loading" />
    );
    expect(getByTestId("skeleton-card-1")).toBeTruthy();
    expect(getByTestId("skeleton-card-2")).toBeTruthy();
  });

  test("renders correctly with invalidSearch screen state", () => {
    const { getByText } = render(
      <WorkResourcesSection {...mockProps} screenState="invalidSearch" />
    );
    expect(
      getByText("There were no resources that match your search criteria")
    ).toBeTruthy();
  });
});
