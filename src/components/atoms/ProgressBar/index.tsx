import { Progress, ProgressFilledTrack } from "@gluestack-ui/themed";

interface IProgressBar {
  value: number;
}

export const ProgressBar = ({ value }: IProgressBar) => {
  return (
    <Progress value={value} w="$full" size="xl">
      <ProgressFilledTrack bgColor="#2980B9" />
    </Progress>
  );
};
