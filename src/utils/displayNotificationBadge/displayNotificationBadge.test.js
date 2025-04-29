import { displayNotificationBadge } from "./displayNotificationBadge";

describe("displayNotificationBadge function", () => {
  test("returns count if route is Notifications and count is greater than 0", () => {
    const route = "Notifications";
    const count = 5;
    const badge = displayNotificationBadge(route, count);
    expect(badge).toBe(count);
  });

  test("returns null if route is Notifications and count is 0", () => {
    const route = "Notifications";
    const count = 0;
    const badge = displayNotificationBadge(route, count);
    expect(badge).toBeNull();
  });

  test("returns null if route is not Notifications", () => {
    const route = "Home";
    const count = 5;
    const badge = displayNotificationBadge(route, count);
    expect(badge).toBeNull();
  });
});
