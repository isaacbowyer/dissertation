import { validateCreateAccountState } from "./validateCreateAccountState";

const validValidationError = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
};

describe("validateCreateAccountState", () => {
  it("should return true if any validationError field is not empty", () => {
    const props = {
      validationError: {
        firstName: "First name error",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
      },
      industry: { id: "1", name: "Industry" },
      gender: { id: "1", name: "Male" },
      country: { id: "1", name: "Country" },
      dateOfBirth: new Date(),
    };

    const result = validateCreateAccountState(props);
    expect(result).toBe(true);
  });

  it("should return true if any option id is missing", () => {
    const props = {
      validationError: validValidationError,
      industry: { id: "", name: "Industry" },
      gender: { id: "1", name: "Male" },
      country: { id: "1", name: "Country" },
      dateOfBirth: new Date(),
    };

    const result = validateCreateAccountState(props);
    expect(result).toBe(true);
  });

  it("should return true if dateOfBirth is missing", () => {
    const props = {
      validationError: validValidationError,
      industry: { id: "1", name: "Industry" },
      gender: { id: "1", name: "Male" },
      country: { id: "1", name: "Country" },
      dateOfBirth: null,
    };

    const result = validateCreateAccountState(props);
    expect(result).toBe(true);
  });

  it("should return false if all conditions are met", () => {
    const props = {
      validationError: validValidationError,
      industry: { id: "1", name: "Industry" },
      gender: { id: "1", name: "Male" },
      country: { id: "1", name: "Country" },
      dateOfBirth: new Date(),
    };

    const result = validateCreateAccountState(props);
    expect(result).toBe(false);
  });
});
