import { compareValues } from ".";

describe("compareValues function", () => {
  it("returns true if the values are equal", () => {
    expect(compareValues(5, 5)).toBe(true);
    expect(compareValues("hello", "hello")).toBe(true);
    expect(compareValues(true, true)).toBe(true);
  });

  it("returns false if the values are not equal", () => {
    expect(compareValues(5, 10)).toBe(false);
    expect(compareValues("hello", "world")).toBe(false);
    expect(compareValues(true, false)).toBe(false);
  });
});
