import { validatePassword } from ".";

describe("validatePassword", () => {
  it("should invalidate short passwords", () => {
    const result = validatePassword("password");
    expect(result).toBe(false);
  });

  it("should validate long passwords", () => {
    const result = validatePassword("veryverylongpassword");
    expect(result).toBe(true);
  });

  it("should validate passwords with 12 chars", () => {
    const result = validatePassword("abcadskwhdye");
    expect(result).toBe(true);
  });

  it("should invalidate passwords with 11 chars", () => {
    const result = validatePassword("abcadskwhdy");
    expect(result).toBe(false);
  });
});
