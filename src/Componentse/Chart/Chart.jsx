import mao from "../../img/10000.jpg";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";

export const Chart = ({ chartData, targetLine }) => {
  return (
    <>
      <img
        src={mao}
        alt="map"
        width="700"
        style={{ marginBottom: "-824.4px" }}
      />

      <LineChart width={700} height={824.4}>
        <YAxis
          dataKey="y"
          domain={[64215, 66000]}
          type="number"
          allowDataOverflow={true}
          hide={true}
        />

        <XAxis
          dataKey="x"
          domain={[13000, 14495]}
          interval={0}
          type="number"
          allowDataOverflow={true}
          hide={true}
        />

        <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
        <Line
          stroke="red"
          strokeWidth={2}
          data={chartData}
          dot={{
            stroke: "green",
            strokeWidth: 25,
          }}
          type="linear"
          dataKey="y"
          tooltipType="none"
        />
        <Line
          stroke="blue"
          strokeWidth={2}
          data={targetLine}
          dot={{
            stroke: "green",
            strokeWidth: 25,
          }}
          type="linear"
          dataKey="y"
          tooltipType="none"
        />
      </LineChart>
    </>
  );
};
