import { createDropdownOptions } from "./createDropdownOptions";

describe("createDropdownOptions function", () => {
  it("returns an array of dropdown options with correct id and name", () => {
    const list = ["Option 1", "Option 2", "Option 3"];
    const expectedOptions = [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ];
    expect(createDropdownOptions(list)).toEqual(expectedOptions);
  });

  it("returns an empty array if the input list is empty", () => {
    expect(createDropdownOptions([])).toEqual([]);
  });

  it("returns an array with single dropdown option if the input list has one item", () => {
    const list = ["Option"];
    const expectedOptions = [{ id: 1, name: "Option" }];
    expect(createDropdownOptions(list)).toEqual(expectedOptions);
  });
});
