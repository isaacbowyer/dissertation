import { calculateProgressPercentage } from "./calculateProgressPercentage";

describe("calculateProgressPercentage function", () => {
  it("returns 100 if currentSeverity is less than targetSeverity", () => {
    const currentSeverity = 5;
    const targetSeverity = 7;
    expect(
      calculateProgressPercentage({ currentSeverity, targetSeverity })
    ).toBe(100);
  });

  it("returns 100 if currentSeverity is equal to targetSeverity", () => {
    const currentSeverity = 7;
    const targetSeverity = 7;
    expect(
      calculateProgressPercentage({ currentSeverity, targetSeverity })
    ).toBe(100);
  });

  it("calculates progress percentage correctly when currentSeverity is greater than targetSeverity", () => {
    const currentSeverity = 9;
    const targetSeverity = 6;

    expect(
      calculateProgressPercentage({ currentSeverity, targetSeverity })
    ).toBe(70);
  });

  it("calculates progress percentage correctly when currentSeverity is greater than targetSeverity", () => {
    const currentSeverity = 10;
    const targetSeverity = 5;

    expect(
      calculateProgressPercentage({ currentSeverity, targetSeverity })
    ).toBe(50);
  });

  it("calculates progress percentage correctly when targetSeverity is 0", () => {
    const currentSeverity = 7;
    const targetSeverity = 0;

    expect(
      calculateProgressPercentage({ currentSeverity, targetSeverity })
    ).toBe(30);
  });

  it("returns 0 if currentSeverity is greater than targetSeverity", () => {
    const currentSeverity = 10;
    const targetSeverity = 5;

    expect(
      calculateProgressPercentage({ currentSeverity, targetSeverity })
    ).toBe(0);
  });
});
