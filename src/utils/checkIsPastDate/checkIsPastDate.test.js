import { checkPastDate } from "./checkPastDate";

describe("checkPastDate function", () => {
  it("returns true if the date is in the past", () => {
    const pastDate = new Date("2022-01-01");
    expect(checkPastDate(pastDate)).toBe(true);
  });

  it("returns false if the date is in the future", () => {
    const futureDate = new Date(Date.now() + 86400000); // Adding 1 day to current date
    expect(checkPastDate(futureDate)).toBe(false);
  });

  it("returns false if the date is the current date", () => {
    const currentDate = new Date();
    expect(checkPastDate(currentDate)).toBe(false);
  });
});
