export const getResourceLikePercentage: IGetResourceLikePercentageUtil = (
  totalUsers,
  totalLikes
) => {
  const value = (totalLikes / totalUsers) * 100;

  if (!value) return 0;

  return parseFloat(value?.toFixed(2));
};

interface IGetResourceLikePercentageUtil {
  (totalUsers: number, totalLikes: number): number;
}
