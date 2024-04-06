"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const TestControll = (props: any) => {
  const answers = props.answers as { questionId: number; answer: number }[];
  const testId = props.testId as number;
  const [results, setResults] = useState<{ results: { id: number, correct: boolean}[], score: string }>({
    results: [],
    score: "",
  });

  const { data: session, update } = useSession();

  function submitTest() {
    axios.post("/api/user/test/submit", {
      answers: answers,
      testId: testId,
    }).then((response) => {
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Here are your results.</DialogTitle>
            
          </DialogHeader>
          {results.results.map((result, i) => (
            <div key={i}>
              <span>{`Question ${i + 1}`}</span>
              {result.correct ? <span> Right</span> : <span> Not right</span>}
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestControll;
