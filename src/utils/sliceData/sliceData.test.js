import { sliceData } from "./sliceData";

describe("sliceData function", () => {
  it("returns sliced data correctly", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const skip = 2;
    const limit = 5;
    const expectedSlicedData = [3, 4, 5, 6, 7];
    expect(sliceData({ data, skip, limit })).toEqual(expectedSlicedData);
  });

  it("returns empty array if skip is greater than data length", () => {
    const data = [1, 2, 3];
    const skip = 5;
    const limit = 2;
    expect(sliceData({ data, skip, limit })).toEqual([]);
  });

  it("returns sliced data correctly if skip + limit exceeds data length", () => {
    const data = [1, 2, 3, 4, 5];
    const skip = 3;
    const limit = 5;
    const expectedSlicedData = [4, 5];
    expect(sliceData({ data, skip, limit })).toEqual(expectedSlicedData);
  });

  it("returns empty array if data is empty", () => {
    const data = [];
    const skip = 0;
    const limit = 5;
    expect(sliceData({ data, skip, limit })).toEqual([]);
  });
});
