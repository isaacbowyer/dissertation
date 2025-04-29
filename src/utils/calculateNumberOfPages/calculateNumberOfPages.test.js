import { calculateNumberOfPages } from "./calculateNumberOfPages";

describe("calculateNumberOfPages function", () => {
  it("calculates the number of pages correctly with default perPage value", () => {
    const count = 10;
    const expectedPages = 5;
    expect(calculateNumberOfPages(count)).toBe(expectedPages);
  });

  it("calculates the number of pages correctly with custom perPage value", () => {
    const count = 10;
    const perPage = 3;
    const expectedPages = 4;
    expect(calculateNumberOfPages(count, perPage)).toBe(expectedPages);
  });

  it("returns 0 pages if count is 0", () => {
    const count = 0;
    const expectedPages = 0;
    expect(calculateNumberOfPages(count)).toBe(expectedPages);
  });

  it("returns 1 page if count is less than perPage", () => {
    const count = 1;
    const expectedPages = 1;
    expect(calculateNumberOfPages(count)).toBe(expectedPages);
  });

  it("returns 1 page if count is equal to perPage", () => {
    const count = 2;
    const expectedPages = 1;
    expect(calculateNumberOfPages(count)).toBe(expectedPages);
  });

  it("returns 1 page if count is 1 and perPage is a custom value", () => {
    const count = 1;
    const perPage = 3;
    const expectedPages = 1;
    expect(calculateNumberOfPages(count, perPage)).toBe(expectedPages);
  });
});
