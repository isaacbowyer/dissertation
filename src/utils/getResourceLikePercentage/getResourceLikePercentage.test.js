import { getResourceLikePercentage } from "./getResourceLikePercentage";

describe("getResourceLikePercentage", () => {
  it("should return 0 if totalUsers or totalLikes is 0", () => {
    const totalUsers = 0;
    const totalLikes = 0;
    const result = getResourceLikePercentage(totalUsers, totalLikes);
    expect(result).toBe(0);
  });

  it("should calculate the correct percentage when totalUsers and totalLikes are non-zero", () => {
    const totalUsers = 100;
    const totalLikes = 50;
    const result = getResourceLikePercentage(totalUsers, totalLikes);
    expect(result).toBe(50);
  });

  it("should round the percentage to two decimal places", () => {
    const totalUsers = 100;
    const totalLikes = 33;
    const result = getResourceLikePercentage(totalUsers, totalLikes);
    expect(result).toBe(33.0);
  });

  it("should handle decimal values correctly", () => {
    const totalUsers = 70;
    const totalLikes = 35;
    const result = getResourceLikePercentage(totalUsers, totalLikes);
    expect(result).toBe(50);
  });
});
