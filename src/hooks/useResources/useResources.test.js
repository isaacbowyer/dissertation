import { renderHook, act } from "@testing-library/react-hooks/native";
import { useResources } from "./useResources";

describe("useResources hook", () => {
  test("returns initial state", () => {
    const { result } = renderHook(() =>
      useResources({
        limit: 10,
        source: { id: "1", name: "Test Source" },
        currentPage: 1,
        name: "work",
        refId: "123",
        skip: 0,
      })
    );

    expect(result.current.state.totalCount).toBe(0);
    expect(result.current.state.totalPages).toBe(0);
    expect(result.current.state.resources).toHaveLength(0);
    expect(result.current.state.isFetching).toBe(false);
    expect(typeof result.current.methods.handleOnRefetch).toBe("function");
  });

  test("refetches data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useResources({
        limit: 10,
        source: { id: "1", name: "Test Source" },
        currentPage: 1,
        name: "work",
        refId: "123",
        skip: 0,
      })
    );

    act(() => {
      result.current.methods.handleOnRefetch();
    });

    await waitForNextUpdate();

    expect(result.current.state.isFetching).toBe(true);
  });
});
