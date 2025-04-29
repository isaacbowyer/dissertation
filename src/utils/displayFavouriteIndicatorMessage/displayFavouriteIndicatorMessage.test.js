import { displayFavouriteIndicatorMessage } from "./displayFavouriteIndicatorMessage";

describe("displayFavouriteIndicatorMessage function ", () => {
  test("returns correct message when percentage is zero", () => {
    const expectedMessage = "No users have liked this resource yet";
    expect(displayFavouriteIndicatorMessage(0)).toBe(expectedMessage);
  });

  test("returns correct message when percentage is greater than zero", () => {
    const expectedMessage = "50% of users have liked this resource";
    expect(displayFavouriteIndicatorMessage(50)).toBe(expectedMessage);
  });

  test("returns correct message when percentage is greater than zero", () => {
    const expectedMessage = "70% of users have liked this resource";
    expect(displayFavouriteIndicatorMessage(70)).toBe(expectedMessage);
  });
});
