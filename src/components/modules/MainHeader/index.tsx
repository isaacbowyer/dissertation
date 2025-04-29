import { SkeletonText } from "../../atoms/SkeletonText";
import { Text } from "../../atoms/Text";

interface IMainHeader {
  title: string;
  isFetching: boolean;
}
export const MainHeader = ({ title, isFetching }: IMainHeader) => {
  if (isFetching) {
    return <SkeletonText width={230} height={30} />;
  }

  return (
    <Text.SubHeader bold color="sky_blue">
      {title}
    </Text.SubHeader>
  );
};
