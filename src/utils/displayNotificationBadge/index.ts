export const displayNotificationBadge: IDisplayNotificationBadgeUtil = (
  route,
  count
) => {
  if (route === "Notifications") {
    if (count === 0) return null;

    return count;
  }

  return null;
};

interface IDisplayNotificationBadgeUtil {
  (route: string, count: number): number;
}
