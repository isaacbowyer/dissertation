import { adjustSeverityValue } from "./adjustSeverityValue";

describe("adjustSeverityValue function", () => {
  it("returns the option object unchanged if name does not include parentheses", () => {
    const option = { id: 1, name: "1" };
    expect(adjustSeverityValue(option)).toEqual(option);
  });

  it("returns an object with only id and the part before the parentheses if name includes parentheses", () => {
    const option = { id: 2, name: "0 (Best)" };
    expect(adjustSeverityValue(option)).toEqual({ id: 2, name: "0" });
  });

  it("returns an object with only id and the part before the parentheses if name includes parentheses and has multiple words", () => {
    const option = { id: 3, name: "10 (Worst)" };
    expect(adjustSeverityValue(option)).toEqual({ id: 3, name: "10" });
  });

  it("returns undefined if option is null", () => {
    expect(adjustSeverityValue(null)).toBeUndefined();
  });
});
