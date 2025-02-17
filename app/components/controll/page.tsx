"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const TestControll = (props: any) => {
  const router = useRouter();
  const answers = props.answers as { questionId: number; answer: number }[];
  const testId = props.testId as number;
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
        if (response.data.score === "100%") {
          console.log(session);
          update({ topicsCompleted: testId });
        }
        console.log(response.data);
      });
  }
  return (
    <>
      <Dialog>
        <div className="flex justify-between mb-5 items-end">
          <Button onClick={() => router.back()} className="mr-4">
            Späť
          </Button>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                submitTest();
              }}
              className="mt-4"
            >
              Odoslať test
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-2xl font-bold mb-4">Výsledky testovania:</h2>
            </DialogTitle>
          </DialogHeader>
          {results.results.map((result, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold">Odpoveď {i + 1}</p>
              <p className={result.correct ? "text-green-600" : "text-red-600"}>
                {result.correct ? "Správna" : "Nesprávna"}
              </p>
            </div>
          ))}
          {results.results.every((result) => result.correct) && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => router.push(`/topics/${testId + 1}`)} className={cn(buttonVariants({ variant: "secondary" }))}>
                Ďalšia téma
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestControll;
