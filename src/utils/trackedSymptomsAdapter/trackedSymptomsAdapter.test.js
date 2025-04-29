import { trackedSymptomsAdapter } from "./trackedSymptomsAdapter";

const mockDocs = [
  {
    id: "1",
    data: jest.fn(() => ({
      symptomId: "symptom1",
      userId: "user1",
      currentSeverity: 7,
      targetSeverity: 5,
      targetDate: { toDate: jest.fn(() => new Date()) },
      createdAt: { toDate: jest.fn(() => new Date()) },
    })),
  },
  {
    id: "2",
    data: jest.fn(() => ({
      symptomId: "symptom2",
      userId: "user1",
      currentSeverity: 3,
      targetSeverity: 2,
      targetDate: { toDate: jest.fn(() => new Date()) },
      createdAt: { toDate: jest.fn(() => new Date()) },
    })),
  },
];

const mockSymptomList = [
  {
    id: "symptom1",
    name: "Headache",
    imageUri: "",
    description: "Pain in the head",
  },
  {
    id: "symptom2",
    name: "Fatigue",
    imageUri: "",
    description: "Feeling of tiredness",
  },
];

describe("trackedSymptomsAdapter", () => {
  it("should return an array of adapted tracked symptoms", () => {
    const adaptedSymptoms = trackedSymptomsAdapter(mockDocs, mockSymptomList);

    expect(adaptedSymptoms).toHaveLength(2);
    expect(adaptedSymptoms[0]).toHaveProperty("id", "1");
    expect(adaptedSymptoms[0]).toHaveProperty("symptomId", "symptom1");
    expect(adaptedSymptoms[0]).toHaveProperty("userId", "user1");
  });

  it("should return empty array if docs is null", () => {
    const adaptedSymptoms = trackedSymptomsAdapter(null, mockSymptomList);
    expect(adaptedSymptoms).toEqual([]);
  });

  it("should handle empty symptomList gracefully", () => {
    const adaptedSymptoms = trackedSymptomsAdapter(mockDocs);
    expect(adaptedSymptoms[0]).toHaveProperty("name", "");
  });
});
