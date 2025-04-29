import { formatUserSymptoms } from "./formatUserSymptoms";

const symptoms = [
  {
    id: "1",
    name: "Fever",
    imageUri: "fever.png",
    description: "Fever description",
  },
  {
    id: "2",
    name: "Cough",
    imageUri: "cough.png",
    description: "Cough description",
  },
];

const trackedSymptoms = [
  {
    id: "1",
    symptomId: "1",
    userId: "user1",
    targetDate: new Date(),
    createdAt: new Date(),
    targetSeverity: 7,
    currentSeverity: 5,
    severityType: "Mild",
  },
  {
    id: "2",
    symptomId: "2",
    userId: "user1",
    targetDate: new Date(),
    createdAt: new Date(),
    targetSeverity: 9,
    currentSeverity: 8,
    severityType: "Severe",
  },
];

describe("formatUserSymptoms", () => {
  it("should format user symptoms correctly", () => {
    const result = formatUserSymptoms({ symptoms, trackedSymptoms });

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      id: "1",
      symptomId: "1",
      userId: "user1",
      imageUri: "fever.png",
      name: "Fever",
      createdAt: expect.any(Date),
      targetDate: expect.any(Date),
      targetSeverity: 7,
      currentSeverity: 5,
      severityType: "Mild",
    });

    expect(result[1]).toEqual({
      id: "2",
      symptomId: "2",
      userId: "user1",
      imageUri: "cough.png",
      name: "Cough",
      createdAt: expect.any(Date),
      targetDate: expect.any(Date),
      targetSeverity: 9,
      currentSeverity: 8,
      severityType: "Severe",
    });
  });

  it("should return empty array if symptoms or trackedSymptoms is empty", () => {
    const resultEmptySymptoms = formatUserSymptoms({
      symptoms: [],
      trackedSymptoms,
    });
    expect(resultEmptySymptoms).toHaveLength(0);

    const resultEmptyTrackedSymptoms = formatUserSymptoms({
      symptoms,
      trackedSymptoms: [],
    });
    expect(resultEmptyTrackedSymptoms).toHaveLength(0);

    const resultEmptyBoth = formatUserSymptoms({
      symptoms: [],
      trackedSymptoms: [],
    });
    expect(resultEmptyBoth).toHaveLength(0);
  });
});
