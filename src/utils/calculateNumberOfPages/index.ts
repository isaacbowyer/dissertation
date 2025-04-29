import { SERVICES_LIMITS } from "../../config/services";

export const calculateNumberOfPages: ICalculateNumberOfPagesUtil = (
  count,
  perPage = SERVICES_LIMITS.DEFAULT_LIMIT
) => {
  return Math.ceil(count / perPage);
};

interface ICalculateNumberOfPagesUtil {
  (count: number, perPage?: number): number;
}
