import { findOption } from "./findOption";

const options = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
];

describe("findOption function", () => {
  test("returns initial option if value is falsy", () => {
    const result = findOption(options, "id", "");
    expect(result).toEqual({ id: "", name: "" });
  });

  test("returns option with matching key and value", () => {
    const result = findOption(options, "id", "2");
    expect(result).toEqual({ id: "2", name: "Option 2" });
  });

  test("returns initial option if no match is found", () => {
    const result = findOption(options, "id", "4");
    expect(result).toEqual({ id: "", name: "" });
  });
});
