import { calculateAverageScores } from "./calculateAverageScores";

describe("calculateAverageScores function", () => {
  const mockData = [
    { createdAt: "2024-05-10", rating: 4 },
    { createdAt: "2024-05-15", rating: 3 },
    { createdAt: "2024-05-20", rating: 5 },
    { createdAt: "2024-06-01", rating: 2 },
    { createdAt: "2024-06-10", rating: 4 },
    { createdAt: "2024-06-20", rating: 5 },
  ];

  it("calculates average scores per week", () => {
    const interval = "Week";
    const limit = 5;
    const result = calculateAverageScores({ data: mockData, interval, limit });

    expect(result).toHaveLength(2);
    expect(result[0].interval).toBe("May 09");
    expect(result[0].averageScore).toBeCloseTo(4);
    expect(result[1].interval).toBe("May 16");
    expect(result[1].averageScore).toBeCloseTo(4);
  });

  it("calculates average scores per month", () => {
    const interval = "Month";
    const limit = 5;
    const result = calculateAverageScores({ data: mockData, interval, limit });

    expect(result).toHaveLength(2);
    expect(result[0].interval).toBe("May");
    expect(result[0].averageScore).toBeCloseTo(4);
    expect(result[1].interval).toBe("June");
    expect(result[1].averageScore).toBeCloseTo(3.67);
  });

  it("returns an empty array if no data is provided", () => {
    const interval = "Week";
    const limit = 5;
    const result = calculateAverageScores({ data: [], interval, limit });
    expect(result).toHaveLength(0);
  });

  it("returns sliced data according to limit", () => {
    const interval = "Week";
    const limit = 2;
    const result = calculateAverageScores({ data: mockData, interval, limit });
    expect(result).toHaveLength(2);
  });
});
