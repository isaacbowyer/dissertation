import { LineChart } from "react-native-chart-kit";
import { IScore } from "../../../entities/IScore";

interface IChart {
  scores: IScore[];
}

export const Chart = ({ scores }: IChart) => {
  return (
    <LineChart
      data={{
        labels: scores?.map((data) => {
          return data.month;
        }),
        datasets: [
          {
            data: scores?.map((data) => Number(data.averageScore)),
          },
        ],
      }}
      width={320}
      height={320}
      chartConfig={{
        backgroundGradientFrom: "#6dd5fa",
        backgroundGradientTo: "#2980B9",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#2980B9",
        },
      }}
      bezier
      fromZero={true}
      style={{
        borderRadius: 16,
        marginBottom: 16,
      }}
    />
  );
};
