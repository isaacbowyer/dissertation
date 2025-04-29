import { displaySymptomProgressMessage } from "./displaySymptomProgressMessage";

describe("displaySymptomProgressMessage function", () => {
  test("returns message for target date passed and met target severity", () => {
    const targetDate = new Date("2024-05-15");
    const currentSeverity = 2;
    const targetSeverity = 2;
    const message = displaySymptomProgressMessage({
      targetDate,
      currentSeverity,
      targetSeverity,
    });
    expect(message).toBe(
      "The Target Date has passed and you have met your Target Severity"
    );
  });

  test("returns message for target date passed and failed to meet target severity", () => {
    const targetDate = new Date("2024-05-15");
    const currentSeverity = 3;
    const targetSeverity = 2;
    const message = displaySymptomProgressMessage({
      targetDate,
      currentSeverity,
      targetSeverity,
    });
    expect(message).toBe(
      "You have failed to met your Target Severity, which was scheduled for the 15th May 2024"
    );
  });

  test("returns message for target date not passed and met target severity", () => {
    const targetDate = new Date("2024-05-30");
    const currentSeverity = 1;
    const targetSeverity = 2;
    const message = displaySymptomProgressMessage({
      targetDate,
      currentSeverity,
      targetSeverity,
    });
    expect(message).toBe(
      "You have met your Target Severity, with 14 days remaining."
    );
  });

  test("returns message for target date not passed and off-track", () => {
    const targetDate = new Date("2024-05-30");
    const currentSeverity = 3;
    const targetSeverity = 2;
    const message = displaySymptomProgressMessage({
      targetDate,
      currentSeverity,
      targetSeverity,
    });
    expect(message).toBe(
      "You are Off-Target of completing your Target Severity rating, which is scheduled for the 30th May 2024"
    );
  });

  test("returns message for target date not passed and on-track", () => {
    const targetDate = new Date("2024-05-30");
    const currentSeverity = 1;
    const targetSeverity = 3;
    const message = displaySymptomProgressMessage({
      targetDate,
      currentSeverity,
      targetSeverity,
    });
    expect(message).toBe(
      "You are On-Target of completing your Target Severity rating, which is scheduled for the 30th May 2024"
    );
  });
});
