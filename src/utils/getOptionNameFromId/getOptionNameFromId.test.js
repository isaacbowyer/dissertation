import { getOptionNameFromId } from "./getOptionNameFromId";

const items = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
];

describe("getOptionNameFromId", () => {
  it("should return empty string if items is empty", () => {
    const result = getOptionNameFromId([], "1");
    expect(result).toBe("");
  });

  it("should return empty string if item with specified id is not found", () => {
    const result = getOptionNameFromId(items, "3");
    expect(result).toBe("");
  });

  it("should return the name of the item with the specified id", () => {
    const result = getOptionNameFromId(items, "2");
    expect(result).toBe("Option 2");
  });
});
