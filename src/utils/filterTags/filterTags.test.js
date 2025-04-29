import { filterTags } from "./filterTags";

const INITIAL_TAGS = ["All", "Website", "Video", "Document", "Favourites"];

describe("filterTags function", () => {
  it("should return all tags when resource name is not 'Favourites'", () => {
    const result = filterTags("All");
    expect(result).toEqual(INITIAL_TAGS);
  });

  it("should return all tags except 'Favourites' when resource name is 'Favourites'", () => {
    const result = filterTags("Favourites");
    const expectedTags = INITIAL_TAGS.filter((tag) => tag !== "Favourites");
    expect(result).toEqual(expectedTags);
  });

  it("should return all tags including 'Favourites' when resource name is 'Document'", () => {
    const result = filterTags("Document");
    expect(result).toEqual(INITIAL_TAGS);
  });

  it("should return all tags including 'Favourites' when resource name is 'Website'", () => {
    const result = filterTags("Website");
    expect(result).toEqual(INITIAL_TAGS);
  });

  it("should return all tags including 'Favourites' when resource name is 'Video'", () => {
    const result = filterTags("Video");
    expect(result).toEqual(INITIAL_TAGS);
  });
});
