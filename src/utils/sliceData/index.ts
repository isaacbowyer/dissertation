export const sliceData: ISliceDataUtil = ({ data, skip, limit }) => {
  return data.slice(skip, skip + limit);
};

interface IProps {
  data: any[];
  skip: number;
  limit: number;
}

interface ISliceDataUtil {
  (props: IProps): any[];
}
