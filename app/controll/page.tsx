"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"

const TestControll = (props: any) => {
  const router = useRouter();
  const answers = props.answers as { questionId: number; answer: number }[];
  const topicNumber = props.topicNumber as number;
  const onResults = props.onResults as Function;
  const { toast } = useToast()

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
        topicNumber: topicNumber,
      })
      .then((response) => {
        setResults(response.data);
        onResults(response.data);

        const correctAnswers = response.data.results.filter((r: any) => r.correct).length;
        const totalQuestions = response.data.results.length;
       
        if (response.data.score === "100%") {
          update({ topicsCompleted: topicNumber });
          setTimeout(() => {
            router.push(`/topic/${topicNumber + 1}`);
          }, 300);
          return;
        }
        toast({
          title: "Výsledok testu",
          description: `Správne odpovede: ${correctAnswers} z ${totalQuestions}`,
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <div className="flex justify-between mb-5 items-end">
        <Button variant="secondary" onClick={() => router.back()} className="mr-4">
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
