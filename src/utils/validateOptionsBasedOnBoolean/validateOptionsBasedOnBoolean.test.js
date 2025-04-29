import { validateOptionsBasedOnBoolean } from "./validateOptionsBasedOnBoolean";

describe("validateOptionsBasedOnBoolean", () => {
  it("should return option1 if isEnabled is true", () => {
    const option1 = "Option 1";
    const option2 = "Option 2";
    const isEnabled = true;

    const result = validateOptionsBasedOnBoolean(isEnabled, option1, option2);

    expect(result).toBe(option1);
  });

  it("should return option2 if isEnabled is false", () => {
    const option1 = "Option 1";
    const option2 = "Option 2";
    const isEnabled = false;

    const result = validateOptionsBasedOnBoolean(isEnabled, option1, option2);

    expect(result).toBe(option2);
  });

  it("should return option1 if isEnabled is true", () => {
    const option1 = 10;
    const option2 = 20;
    const isEnabled = true;

    const result = validateOptionsBasedOnBoolean(isEnabled, option1, option2);

    expect(result).toBe(option1);
  });

  it("should return option2 if isEnabled is false", () => {
    const option1 = 10;
    const option2 = 20;
    const isEnabled = false;

    const result = validateOptionsBasedOnBoolean(isEnabled, option1, option2);

    expect(result).toBe(option2);
  });
});
