import { createSearchConfig } from "./createSearchConfig";

describe("createSearchConfig function", () => {
  it("returns an empty array if isSearchActive is false", () => {
    const search = {
      symptom: "Headache",
      currentRating: { id: "1", name: "3" },
      targetRating: { id: "2", name: "5" },
      targetDate: new Date("2024-05-31"),
      severityType: { id: "1", name: "Low" },
    };
    expect(createSearchConfig({ isSearchActive: false, search })).toEqual([]);
  });

  it("creates search config with correct conditions when isSearchActive is true", () => {
    const search = {
      symptom: "Headache",
      currentRating: { id: "1", name: "3" },
      targetRating: { id: "2", name: "5" },
      targetDate: new Date("2024-05-31"),
      severityType: { id: "1", name: "Low" },
    };
    const expectedConfig = [
      { name: "currentSeverity", value: 3 },
      { name: "targetSeverity", value: 5 },
      { name: "severityType", value: "Low" },
      { name: "name", value: "Headache" },
      { name: "targetDate", value: new Date("2024-05-31") },
    ];
    expect(createSearchConfig({ isSearchActive: true, search })).toEqual(
      expectedConfig
    );
  });

  it("creates search config without optional fields if they are not provided", () => {
    const search = {
      symptom: "",
      currentRating: { id: "1", name: "3" },
      targetRating: null,
      targetDate: null,
      severityType: null,
    };
    const expectedConfig = [{ name: "currentSeverity", value: 3 }];
    expect(createSearchConfig({ isSearchActive: true, search })).toEqual(
      expectedConfig
    );
  });

  it("creates search config with number values when applicable", () => {
    const search = {
      symptom: "",
      currentRating: { id: "1", name: "3" },
      targetRating: { id: "2", name: "5" },
      targetDate: null,
      severityType: null,
    };
    const expectedConfig = [
      { name: "currentSeverity", value: 3 },
      { name: "targetSeverity", value: 5 },
    ];
    expect(createSearchConfig({ isSearchActive: true, search })).toEqual(
      expectedConfig
    );
  });

  it("creates search config with string values when applicable", () => {
    const search = {
      symptom: "Cough",
      currentRating: null,
      targetRating: null,
      targetDate: null,
      severityType: { id: "1", name: "High" },
    };
    const expectedConfig = [
      { name: "name", value: "Cough" },
      { name: "severityType", value: "High" },
    ];
    expect(createSearchConfig({ isSearchActive: true, search })).toEqual(
      expectedConfig
    );
  });
});
