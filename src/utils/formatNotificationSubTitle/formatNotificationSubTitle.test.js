import { formatNotificationSubTitle } from "./formatNotificationSubTitle";

const subTitle = "Notification Subtitle";

describe("formatNotificationSubTitle", () => {
  it("should return formatted subtitle with date", () => {
    const date = new Date("2024-05-30");
    const result = formatNotificationSubTitle(subTitle, date);
    expect(result).toBe("Notification Subtitle - May 30, 2024");
  });

  it("should return formatted subtitle with current date if date is not provided", () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString("en-US", {
      month: "long",
    })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    const result = formatNotificationSubTitle(subTitle);
    expect(result).toBe(`Notification Subtitle - ${formattedDate}`);
  });
});
