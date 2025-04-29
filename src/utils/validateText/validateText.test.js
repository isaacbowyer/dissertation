import { validateString } from ".";

describe("validateString", () => {
  it("validates string with min length", () => {
    const result = validateString("x");
    expect(result).toBe(true);
  });

  it("does not validate string without min length", () => {
    const result = validateString("");
    expect(result).toBe(false);
  });

  it("validates string with a lot of length", () => {
    const result = validateString("test");
    expect(result).toBe(true);
  });
});
