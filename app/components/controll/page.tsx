"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TestControll = (props: any) => {
  const router = useRouter();
  const answers = props.answers as { questionId: number; answer: number }[];
  const testId = props.testId as number;
  const onResults = props.onResults as Function;

  const [results, setResults] = useState<{
    results: { id: number; correct: boolean }[];
    score: string;
  }>({
    results: [],
    score: "",
  });

  const { data: session, update } = useSession();

  function submitTest() {
    axios
      .post("/api/user/test/submit", {
        answers: answers,
        testId: testId,
      })
      .then((response) => {
        setResults(response.data);
        onResults(response.data);
        if (response.data.score === "100%") {
          console.log(session);
          update({ topicsCompleted: testId });
          setTimeout(() => {
            router.push(`/topics/${testId + 1}`);
          }
          , 1500);
        }
        console.log(response.data);
      });
  }

  return (
    <>
      <div className="flex justify-between mb-5 items-end">
        <Button onClick={() => router.back()} className="mr-4">
          Späť
        </Button>
        <Button
          onClick={() => {
            submitTest();
          }}
          className="mt-4"
        >
          Odoslať test
        </Button>
      </div>
    </>
  );
};

export default TestControll;
