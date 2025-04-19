import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart } from "recharts";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useTheme } from "next-themes";

interface TestStats {
  testId: number;
  users_completed: number;
}

interface Topic {
  topicNumber: number;
  title: string;
  description: string;
  createdById: number;
}

const TopicStats = ({ topics }: { topics: Topic[] }) => {
  const [testStats, setTestStats] = useState<TestStats[]>([]);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const fetchTestStats = async () => {
      try {
        const response = await fetch("/api/topic/getGlobalStats");
        const data = await response.json();
        if (!data.data) {
          throw new Error("Chyba pri načítaní štatistík.");
        }
        setTestStats(data.data);
      } catch (error) {
        console.error("Error fetching test stats:", error);
      }
    };

    fetchTestStats();
  }, []);

  const chartData: { topic: string; users: number }[] = [];
  let chartConfig = {
    topic: {
      label: "Štatistika testovania",
      color: "hsl(var(--chart-2))",
    },
  };

  testStats.forEach((stat) => {
    const topic = topics.find((t) => t.topicNumber === stat.testId);
    if (topic) {
      chartData.push({
        topic: `#${stat.testId}. ${topic.title}`,
        users: stat.users_completed,
      });
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
      <h1 className={`text-4xl ${isDark ? 'text-blue-300' : 'text-blue-500'} hover:text-blue-400 transition-colors font-bold text-center my-4 sm:mt-[20px] cursor-pointer`}>
          Témy
        </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-lg rounded-xl p-6">
        <p className="text-lg text-center mt-2 font-semibold">
          Tu môžete vidieť počet používateľov, ktorí úspešne dokončili testovanie tejto témy.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Výsledky testovania</CardTitle>
            <CardDescription>Štatistiky pre témy</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="topic"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, value.indexOf("."))}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-topic)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default TopicStats;
