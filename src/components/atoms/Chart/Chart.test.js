import React from "react";
import { render } from "@testing-library/react-native";
import { Chart } from "./Chart";

const mockScores = [
  { interval: "Jan", averageScore: 3 },
  { interval: "Feb", averageScore: 4 },
  { interval: "Mar", averageScore: 5 },
];

describe("Chart component", () => {
  it("renders correctly with provided scores", () => {
    const { getByTestId } = render(<Chart scores={mockScores} />);

    // Check if LineChart component is rendered
    const lineChart = getByTestId("line-chart");
    expect(lineChart).toBeTruthy();

    // Check if labels are rendered correctly
    const labels = mockScores.map((score) => score.interval);
    labels.forEach((label) => {
      expect(getByTestId(`label-${label}`)).toBeTruthy();
    });

    // Check if data points are rendered correctly
    mockScores.forEach((score) => {
      expect(getByTestId(`data-point-${score.interval}`)).toBeTruthy();
    });
  });
});
