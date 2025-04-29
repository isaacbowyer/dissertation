import { getResourceButtonLabel } from "./getResourceButtonLabel";

describe("getResourceButtonLabel", () => {
  it('should return "Go To Website" if resourceType is "Website"', () => {
    const resourceType = "Website";
    const result = getResourceButtonLabel(resourceType);
    expect(result).toBe("Go To Website");
  });

  it('should return "Watch Video" if resourceType is not "Website"', () => {
    const resourceType = "Video";
    const result = getResourceButtonLabel(resourceType);
    expect(result).toBe("Watch Video");
  });

  it('should return "Watch Video" if resourceType is not specified', () => {
    const result = getResourceButtonLabel();
    expect(result).toBe("Watch Video");
  });
});
