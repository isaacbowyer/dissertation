import React from "react";
import { render } from "@testing-library/react";
import { IllustrationStateLoading } from "./IllustrationStateLoading";

describe("IllustrationStateLoading", () => {
  test("renders skeleton cards based on skeletonType prop", () => {
    const { getByTestId } = render(
      <IllustrationStateLoading skeletonType="resource" />
    );

    // Assert that skeleton cards are rendered
    expect(getByTestId("skeleton-card-1")).toBeInTheDocument();
    expect(getByTestId("skeleton-card-2")).toBeInTheDocument();
  });

  test("renders symptom skeleton cards when skeletonType prop is 'symptom'", () => {
    const { getByTestId } = render(
      <IllustrationStateLoading skeletonType="symptom" />
    );

    // Assert that symptom skeleton cards are rendered
    expect(getByTestId("skeleton-card-1")).toBeInTheDocument();
    expect(getByTestId("skeleton-card-2")).toBeInTheDocument();
  });

  test("renders notification skeleton cards when skeletonType prop is 'notification'", () => {
    const { getByTestId } = render(
      <IllustrationStateLoading skeletonType="notification" />
    );

    // Assert that notification skeleton cards are rendered
    expect(getByTestId("skeleton-card-1")).toBeInTheDocument();
    expect(getByTestId("skeleton-card-2")).toBeInTheDocument();
  });
});
