"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { SolvedTest } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const topics = [
  "LPWAN: technológie a aplikácie",
  "LoRaWAN: Lora Alliance, obmedzenia a výhody",
  "Architektúra LoRaWAN",
  "NB-IoT: špecifikácie a výhody",
  "NB-IoT: aplikácie",
  "Porovnanie technológií LPWAN",
];

const Admin = () => {
  const [solvedTests, setSolvedTests] = useState<SolvedTest[]>([]);
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    axios.get("/api/user/test/solved").then((response) => {
      setSolvedTests(response.data);
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

  useEffect(() => {
    const completed = Object.values(groupTestsByTopic()).length;
    const newProgress = (completed / 6) * 100;
    console.log(completed);
    setProgress(newProgress);
  }, [solvedTests]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold my-9">
          {" "}
          Váš priebeh štúdia, {session?.user?.name}
        </h2>
      </div>

      <div className="mb-5">
        <Progress value={progress} />
      </div>

      <Separator />
      {Object.entries(groupTestsByTopic()).map(([topic, tests]) => {
        let i = 1;
        const topicIndex = parseInt(topic, 10) - 1;
        let isTopicSolved = false; 
        return (
          <div key={topic}>
            <h2 className="text-lg font-bold mt-8 mb-3">
              {topicIndex + 1}. {topics[topicIndex]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tests.map((test, index) => {
                if (!isTopicSolved) {
                    if (test.score === 100) {
                      isTopicSolved = true;
                      return (
                        <div key={index} className="border mb-6 rounded-lg p-4 bg-green-600">
                          <p className="mb-2">Pokus: {i++}</p>{" "}
                          <p className="mb-2">Úspech: {test.score} %</p>
                          <p className="text-green-900 font-bold">Topic Completed!</p>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="border mb-6 rounded-lg p-4">
                          <p className="mb-2">Pokus: {i++}</p>{" "}
                          <p className="mb-2">Úspech: {test.score} %</p>
                          <Progress value={test.score} />
                        </div>
                      );
                    }
                  }
                  return null; 
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
