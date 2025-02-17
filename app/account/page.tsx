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
  const router = useRouter();
  const isTeacher = session?.user?.role === "TEACHER";
  const isAdmin = session?.user?.role === "ADMIN";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/user/test/solved").then((response) => {
      setSolvedTests(response.data);
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

  useEffect(() => {
    const completed = Object.values(groupTestsByTopic()).length;
    const newProgress = (completed / 6) * 100;
    console.log(completed);
    setProgress(newProgress);
  }, [solvedTests]);

  if (!session || loading) {
    return <></>;
  }

  return (
    <div className="container mx-auto p-4">
      {isTeacher && (
        <div className="text-center">
          <h3 className="text-2xl font-bold my-9">
            Máte k dispozícii funkciu na pridanie novej témy.
          </h3>
        </div>
      )}

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
              Váš priebeh štúdia, {session?.user?.name}
            </h2>
          </div>
          <div className="mb-5">
            <Progress value={progress} />
          </div>
          {Object.entries(groupTestsByTopic()).map(([topic, tests]) => {
            let i = 1;
            const topicIndex = parseInt(topic, 10) - 1;
            let isTopicSolved = false;
            return (
              <div key={topic}>
                <Link
                  href={`/topics/${topicIndex + 1}`}
                  className="text-lg hover:underline"
                >
                  {topicIndex + 1}. {topics[topicIndex]}
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tests.map((test, index) => {
                    if (!isTopicSolved) {
                      if (test.score === 100) {
                        isTopicSolved = true;
                        return (
                          <div
                            key={index}
                            className="border mb-6 rounded-lg p-4 bg-green-600"
                          >
                            <p className="mb-2">Pokus: {i++}</p>{" "}
                            <p className="mb-2">Úspech: {test.score} %</p>
                            <p className="text-green-900 font-bold">
                              Téma ukončená!
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="border mb-6 rounded-lg p-4"
                          >
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
      )}
      <ArrowToTop className="fixed bottom-6 right-6 z-[999]"/>
    </div>
  );
};

export default Admin;
