import { scoresAdapter } from "./scoresAdapter";

const mockDocs = [
  {
    id: "1",
    data: jest.fn(() => ({
      symptomId: "symptom1",
      userId: "user1",
      rating: "5",
      createdAt: { toDate: jest.fn(() => new Date()) },
      comment: "Test comment 1",
    })),
  },
  {
    id: "2",
    data: jest.fn(() => ({
      symptomId: "symptom2",
      userId: "user2",
      rating: "3",
      createdAt: { toDate: jest.fn(() => new Date()) },
      comment: "Test comment 2",
    })),
  },
];

describe("scoresAdapter", () => {
  it("should have a length of 2", () => {
    const adaptedScores = scoresAdapter(mockDocs);

    expect(adaptedScores).toHaveLength(2);
  });

  it("should return an array of adapted scores", () => {
    const adaptedScores = scoresAdapter(mockDocs);

    expect(adaptedScores[0]).toHaveProperty("id", "1");
    expect(adaptedScores[0]).toHaveProperty("symptomId", "symptom1");
    expect(adaptedScores[0]).toHaveProperty("userId", "user1");
    expect(adaptedScores[0]).toHaveProperty("rating", 5);
  });

  it("should return an empty array if docs is null", () => {
    const adaptedScoresNull = scoresAdapter(null);
    expect(adaptedScoresNull).toEqual([]);
  });
});
