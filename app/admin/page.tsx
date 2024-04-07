"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { SolvedTest } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Progress } from "@/components/ui/progress";

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
    const totalTopics = Object.values(groupTestsByTopic()).length;
    let completedTopics = 0;
  
    Object.values(groupTestsByTopic()).forEach((tests) => {
      const topicCompleted = tests.every((test) => test.score === 100);
      if (topicCompleted) {
        completedTopics++;
      }
    });
  
    const newProgress = (completedTopics / totalTopics) * 100;
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
      <h1 className="text-2xl font-bold mb-4">Vyriešené témy</h1>
      <div className="mb-5">
        <Progress value={progress} />
      </div>
      {Object.entries(groupTestsByTopic()).map(([topic, tests]) => {
        let i = 1; 
        return (
          <div key={topic}>
            <h2 className="text-lg font-bold my-2">Téma {topic}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tests.map((test, index) => (
                <div key={index} className="border mb-6 rounded-lg p-4">
                  <p className="mb-2">Pokus: {i++}</p>{" "}
                  <p className="mb-2">Úspech: {test.score} %</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
