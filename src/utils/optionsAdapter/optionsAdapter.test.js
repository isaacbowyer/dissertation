import { optionsAdapter } from "./optionsAdapter";

const mockDocs = [
  {
    id: "1",
    data: jest.fn(() => ({
      name: "Option 1",
    })),
  },
  {
    id: "2",
    data: jest.fn(() => ({
      name: "Option 2",
    })),
  },
];

describe("optionsAdapter", () => {
  it("should adapt option documents correctly", () => {
    const adaptedOptions = optionsAdapter(mockDocs);

    expect(adaptedOptions[0]).toEqual({
      id: "1",
      name: "Option 1",
    });
    expect(adaptedOptions[1]).toEqual({
      id: "2",
      name: "Option 2",
    });
  });

  it("should have a length", () => {
    const adaptedOptions = optionsAdapter(mockDocs);

    expect(adaptedOptions).toHaveLength(2);
  });

  it("should return an empty array if items is null", () => {
    const adaptedOptionsNull = optionsAdapter(null);
    expect(adaptedOptionsNull).toEqual([]);
  });
});
