import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format the provided date correctly", () => {
    const date = new Date("2024-05-30");
    const result = formatDate(date);
    expect(result).toBe("30/05/2024");
  });

  it("should format the current date if no date is provided", () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const result = formatDate();
    expect(result).toBe(formattedDate);
  });
});
