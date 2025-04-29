export const displayFavouriteIndicatorMessage: IDisplayFavouriteIndicatorMessageUtil =
  (percentage) => {
    if (!percentage) return "No users have liked this resource yet";

    return `${percentage}% of users have liked this resource`;
  };

interface IDisplayFavouriteIndicatorMessageUtil {
  (percentage: number): string;
}
