import { addWorstOrBestToSeverity } from ".";

describe("addWorstOrBestToSeverity", () => {
  const createSeverityOption = (id, name) => ({ id, name });

  it("returns severity unchanged if it is neither best nor worst", () => {
    const severity = createSeverityOption("1", "5");

    const result = addWorstOrBestToSeverity(severity);

    expect(result).toEqual(severity);
  });

  it('adds "Best" tag to severity with value 0', () => {
    const severity = createSeverityOption("1", "0");

    const result = addWorstOrBestToSeverity(severity);

    expect(result).toEqual({ id: "1", name: "0 (Best)" });
  });

  it('adds "Worst" tag to severity with value 10', () => {
    const severity = createSeverityOption("1", "10");

    const result = addWorstOrBestToSeverity(severity);

    expect(result).toEqual({ id: "1", name: "10 (Worst)" });
  });
});
