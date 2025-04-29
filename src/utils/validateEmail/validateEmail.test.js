import { validateEmail } from ".";

const validEmail = "test@gmail.com";
const invalidWithoutAt = "testgmail.com";
const invalidWithoutDot = "test@gmailcom";
const invalidShort = "t@g.c";

describe("validateEmail", () => {
  it("should validate valid email", () => {
    const result = validateEmail(validEmail);
    expect(result).toBe(true);
  });

  it("should invalidate email without @", () => {
    const result = validateEmail(invalidWithoutAt);
    expect(result).toBe(false);
  });

  it("should invalidate email without .", () => {
    const result = validateEmail(invalidWithoutDot);
    expect(result).toBe(false);
  });

  it("should invalidate not long enough email", () => {
    const result = validateEmail(invalidShort);
    expect(result).toBe(false);
  });
});
