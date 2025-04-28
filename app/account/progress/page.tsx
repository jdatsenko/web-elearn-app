"use client";
import axios from "axios";
import { useEffect, useState } from "react";
//@ts-ignore
import { SolvedTest } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Progress } from "@/components/ui/progress";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowToTop } from "@/components/ui/arrow-to-top";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const UserProgress = () => {
  const [solvedTests, setSolvedTests] = useState<SolvedTest[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const { data: session } = useSession();
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/user/test/solved").then((response) => {
      setSolvedTests(response.data);
      console.log("DATA from the api:", response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/topic/getTopicsTitles").then((response) => {
      setTopics(response.data.data);
      setLoading(false);
    });
  }, []);

  const groupTestsByTopic = () => {
    const groupedTests: { [key: number]: SolvedTest[] } = {};

    solvedTests.forEach((test) => {
      if (!groupedTests[test.testId]) {
        groupedTests[test.testId] = [];
      }
      groupedTests[test.testId].push(test);
    });

    return groupedTests;
  };

  let chartConfig: ChartConfig[] = [];
  const chartData: { [key: number]: any[] } = {};

  Object.entries(groupTestsByTopic()).forEach(([topic, tests]) => {
    const topicIndex = parseInt(topic, 10) - 1;
    const topicName = topics[topicIndex];
    chartConfig[topicIndex] = {
      topic: {
        label: topicName,
        color: `hsl(var(--chart-${topicIndex + 1}))`,
      },
    };
    chartData[topicIndex] = [];
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      chartData[topicIndex].push({
        attempt: i == 0 ? "Pokus 1" : `${i + 1}`,
        topic: test.score,
      });
      if (test.score === 100) break;
    }
  });

  useEffect(() => {
    const completed = Object.values(groupTestsByTopic()).length;
    const newProgress = (completed / 6) * 100;
    setProgress(newProgress);
  }, [solvedTests]);

  if (!session || loading) {
    return <></>;
  }

  return (
    <div className="container mx-auto p-4">
      {Object.entries(groupTestsByTopic()).length === 0 ? (
        <div>
          <div className="text-center">
            <h2 className="text-4xl font-bold my-9">
              Zatiaľ ste nezačali žiadnu tému
            </h2>
          </div>
          <div className="flex justify-center items-center min-h-24">
            <Button
              onClick={() => router.push(`/topics/1`)}
              className="px-8 py-6 text-xl"
            >
              Začať progress
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center">
            <h2 className="text-4xl font-bold my-9">
              {" "}
              Váš priebeh štúdia, <Link href="./data" className="text-blue-500 underline hover:text-blue-600 transition-colors">{session?.user?.name}</Link>
            </h2>
          </div>
          <div className="mb-5">
            <Progress value={progress} />
          </div>

          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chartConfig.map((config, index) => (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Link
                        href={`/topics/${index + 1}`}
                        className="text-blue-500 underline hover:text-blue-600 transition-colors"
                      >
                        {index + 1}. {topics[index]}
                      </Link>
                    </CardTitle>
                    <CardDescription>Výsledky testovania</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={config}>
                      <AreaChart
                        accessibilityLayer
                        data={chartData[index]}
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

                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />

                        <defs>
                          <linearGradient
                            id={`filltopic`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
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
                  </CardContent>
                  <CardFooter>
                    {chartData[index].length > 0 &&
                    chartData[index][chartData[index].length - 1].topic ===
                      100 ? (
                      <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2 font-medium leading-none">
                            Téma bola ukončená!{" "}
                            {
                              // Find solvedAt from the solvedTests array
                              (() => {
                                const solved = solvedTests.find(
                                  (t) =>
                                    t.testId === index + 1 && t.score === 100
                                );
                                if (!solved) return null;

                                const formatted = new Intl.DateTimeFormat(
                                  "sk-SK",
                                  {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                  }
                                ).format(new Date(solved.solvedAt));

                                return (
                                  <span className="text-muted-foreground ml-1">
                                    {formatted}
                                  </span>
                                );
                              })()
                            }
                            <TrendingUp className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2 font-medium leading-none">
                            Téma nie je ukončená!{" "}
                            <TrendingDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}
      <ArrowToTop className="fixed bottom-6 right-6 z-[999]" />
    </div>
  );
};

export default UserProgress;
