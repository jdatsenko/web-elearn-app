"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  chartData: { date: string; users: number }[];
}

export default function Stats({ chartData }: Props) {
  let chartConfig: ChartConfig = {
    topic: {
      label: "Štatistika testovania",
      color: `hsl(var(--chart-2))`,
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="px-4 py-2 rounded-lg">
          Štatistika
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-lg rounded-xl p-6">
        <p className="text-lg text-center mt-2 font-semibold">
          Tu môžete vidieť počet používateľov, ktorí úspešne dokončili
          testovanie tejto témy.
        </p>
        <Card>
          <CardHeader>
            <CardTitle />
            <CardDescription>Výsledky testovania</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}`}
                />
                <YAxis
                  dataKey="users"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 10]}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="filltopic" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-topic)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-topic)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="users"
                  type="natural"
                  fill="url(#filltopic)"
                  fillOpacity={0.4}
                  stroke="var(--color-topic)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
