import { formatTitleWithCount } from "./formatTitleWithCount";

describe("formatTitleWithCount", () => {
  it("should return title with count if both title and count are provided", () => {
    const title = "Title";
    const count = 5;
    const result = formatTitleWithCount(title, count);
    expect(result).toBe("Title (5)");
  });

  it("should return title with count 0 if title is provided but count is not", () => {
    const title = "Title";
    const result = formatTitleWithCount(title);
    expect(result).toBe("Title (0)");
  });
});
