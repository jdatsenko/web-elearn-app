"use client";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

interface ProgressChartProps {
  chartData: any[];
  config: ChartConfig;
  index: number;
}

const ProgressChart = ({ chartData, config, index }: ProgressChartProps) => {
  return (
    <ChartContainer config={config}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="attempt"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          dataKey="topic"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id={`filltopic`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={`var(--color-topic)`}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={`var(--color-topic)`}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          key={`area`}
          dataKey={`topic`}
          type="natural"
          fill={`url(#filltopic)`}
          fillOpacity={0.4}
          stroke={`var(--color-topic)`}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ProgressChart;
