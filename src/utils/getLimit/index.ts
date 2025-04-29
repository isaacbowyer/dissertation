export const getLimit: IGetLimitUtil = (limit, page) => {
  return page > 1 ? (page - 1) * limit : limit;
};

interface IGetLimitUtil {
  (limit: number, page: number): number;
}
