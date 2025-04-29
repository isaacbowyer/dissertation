import { getSeverityType } from "./getSeverityType";

describe("getSeverityType", () => {
  it('should return "Critical" if severity is greater than or equal to 9', () => {
    const severity = 9;
    const result = getSeverityType(severity);
    expect(result).toBe("Critical");
  });

  it('should return "Severe" if severity is greater than or equal to 7', () => {
    const severity = 7;
    const result = getSeverityType(severity);
    expect(result).toBe("Severe");
  });

  it('should return "Mild" if severity is greater than or equal to 4', () => {
    const severity = 4;
    const result = getSeverityType(severity);
    expect(result).toBe("Mild");
  });

  it('should return "Stable" if severity is greater than or equal to 2', () => {
    const severity = 2;
    const result = getSeverityType(severity);
    expect(result).toBe("Stable");
  });

  it('should return "Healthy" if severity is less than 2', () => {
    const severity = 1;
    const result = getSeverityType(severity);
    expect(result).toBe("Healthy");
  });
});
