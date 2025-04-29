import { validateUpdatePassword } from "./validateUpdatePassword";

describe("validateUpdatePassword", () => {
  it("should return true if password is empty", () => {
    const password = "";
    const result = validateUpdatePassword(password);
    expect(result).toBe(true);
  });

  it("should return false if password is missing special character", () => {
    const password = "Password123";
    const result = validateUpdatePassword(password);
    expect(result).toBe(false);
  });

  it("should return false if password is too short", () => {
    const shortPassword = "Pwd123!";
    const shortResult = validateUpdatePassword(shortPassword);
    expect(shortResult).toBe(false);
  });

  it("should return false if password is missing uppercase character", () => {
    const noUppercasePassword = "password123!";
    const noUppercaseResult = validateUpdatePassword(noUppercasePassword);
    expect(noUppercaseResult).toBe(false);
  });

  it("should return true if password meets validation criteria", () => {
    const validPassword = "ValidPassword123!";
    const result = validateUpdatePassword(validPassword);
    expect(result).toBe(true);
  });
});
