import { getDaysLeft } from "./getDaysLeft";

const today = new Date();
describe("getDaysLeft", () => {
  it("should return 0 if target date is today", () => {
    const result = getDaysLeft(today);
    expect(result).toBe(0);
  });

  it("should return 1 if target date is tomorrow", () => {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 1);
    const result = getDaysLeft(tomorrow);
    expect(result).toBe(1);
  });

  it("should return difference in days if target date is in the future", () => {
    const targetDate = new Date(2024, 5, 1); // June 1, 2024
    const result = getDaysLeft(targetDate);
    expect(result).toBe(2); // Expected difference is 2 days (June 1 - May 30)
  });

  it("should return 0 if target date is in the past", () => {
    const targetDate = new Date(2024, 4, 1); // May 1, 2024
    const result = getDaysLeft(targetDate);
    expect(result).toBe(0); // Expected result is 0 days as the date is in the past
  });
});
