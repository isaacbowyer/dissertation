import { decideScreenStateToRender } from "./decideScreenStateToRender";

describe("decideScreenStateToRender function", () => {
  it('returns "loading" if isFetching is true', () => {
    const input = { isFetching: true, entriesLength: 5 };
    expect(decideScreenStateToRender(input)).toBe("loading");
  });

  it('returns "invalidSearch" if isInvalidSearch is true', () => {
    const input = {
      isFetching: false,
      entriesLength: 5,
      isInvalidSearch: true,
    };
    expect(decideScreenStateToRender(input)).toBe("invalidSearch");
  });

  it('returns "empty" if entriesLength is 0', () => {
    const input = { isFetching: false, entriesLength: 0 };
    expect(decideScreenStateToRender(input)).toBe("empty");
  });

  it('returns "results" if none of the conditions are met', () => {
    const input = { isFetching: false, entriesLength: 5 };
    expect(decideScreenStateToRender(input)).toBe("results");
  });
});
