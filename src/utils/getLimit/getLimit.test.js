import { getLimit } from "./getLimit";

describe("getLimit", () => {
  it("should return limit when page is 1", () => {
    const result = getLimit(10, 1);
    expect(result).toBe(10);
  });

  it("should return calculated limit when page is greater than 1", () => {
    const result = getLimit(10, 3);
    expect(result).toBe(20);
  });

  it("should return 0 when limit is 0", () => {
    const result = getLimit(0, 3);
    expect(result).toBe(0);
  });

  it("should return 0 when page is 0", () => {
    const result = getLimit(10, 0);
    expect(result).toBe(0);
  });
});
