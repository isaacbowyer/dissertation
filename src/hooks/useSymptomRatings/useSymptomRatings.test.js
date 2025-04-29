import { renderHook } from "@testing-library/react-hooks";
import { useSymptomRatings } from "./useSymptomRatings";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockSymptomId = "123";
const mockUserId = "456";
const mockSymptomScores = [
  {
    userId: mockUserId,
    symptomId: mockSymptomId,
    id: "1",
    createdAt: new Date("2024-05-01"),
    rating: 3,
    comment: "Test comment 1",
  },
  {
    userId: mockUserId,
    symptomId: mockSymptomId,
    id: "2",
    createdAt: new Date("2024-05-02"),
    rating: 4,
    comment: "Test comment 2",
  },
];

describe("useSymptomRatings hook", () => {
  beforeEach(() => {
    useQuery.mockReturnValue({ data: mockSymptomScores, isFetching: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch symptom ratings with correct query parameters", async () => {
    renderHook(() => useSymptomRatings());
    expect(useQuery).toHaveBeenCalledWith(
      ["/scores"],
      expect.any(Function),
      expect.objectContaining({
        enabled: true,
        initialData: [],
        refetchOnWindowFocus: false,
      })
    );
  });

  it("should return symptom scores and isFetching state", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSymptomRatings());

    await waitForNextUpdate();

    expect(result.current.scores).toEqual(mockSymptomScores);
    expect(result.current.isFetching).toBe(false);
  });

  it("should handle error if fetching symptom ratings fails", async () => {
    useQuery.mockReturnValueOnce({
      data: undefined,
      error: new Error("Failed to fetch data"),
      isFetching: false,
    });

    const { result, waitForNextUpdate } = renderHook(() => useSymptomRatings());

    await waitForNextUpdate();

    expect(result.current.scores).toEqual([]);
    expect(result.current.isFetching).toBe(false);
  });
});
