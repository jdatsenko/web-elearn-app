"use client";
import TestControll from "@/app/components/controll/page";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  text: string;
}

interface TestResponse {
  questions: Question[];
  topic: {
    id: number;
    title: string;
  };
}

const TestPage = ({ params }: { params: { id: string } }) => {
  const topicId = parseInt(params.id);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState<TestResponse>();
  const [topicTitle, setTopicTitle] = useState<string>("");
  const { toast } = useToast();
  const [answers, setAnswers] = useState<
    { questionId: number; answer: number; answerId: number }[]
  >([]);

  const [results, setResults] = useState<{
    results: { id: number; correct: boolean }[];
    score: string;
  }>({
    results: [],
    score: "",
  });

  const handleAnswersUpdate = (result: {
    results: { id: number; correct: boolean }[];
    score: string;
  }) => {
    setResults(result);
  };

  useEffect(() => {
    axios
      .get("/api/tests/get", {
        params: {
          id: topicId,
        },
      })
      .then((res) => {
        const resTest = res.data as TestResponse;
        setTest(res.data);
        setTopicTitle(resTest.topic?.title ?? "");
        setAnswers(
          resTest.questions.map((question) => ({
            questionId: question.id,
            answerId: 0,
            answer: 0,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test data:", error);
        toast({
          title: "Chyba",
          description:
            error.response?.data?.message ||
            "Nastala chyba pri načítaní testu.",
          variant: "destructive",
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg">Načítava sa...</p>;

  if (!test || !test.questions || test.questions.length === 0) {
    return (
      <div className="text-red-500 text-3xl font-bold text-center mt-10">
        Test pre túto tému nebol nájdený.
      </div>
    );
  }

  return (
    <div>
      <p className="text-3xl font-semibold text-center my-6">{topicTitle}</p>
      {!session ? (
        <div className="text-red-500 text-3xl font-bold text-center mt-10">
          Musíte byť autorizovaný, aby ste mohli začať testovanie.
        </div>
      ) : (
        test &&
        test.questions.map((question, i) => (
          <React.Fragment key={question.id}>
            <RadioGroup
              key={question.id}
              className={`flex flex-col space-y-1 mb-2 border-solid border-2 m-5 rounded-md p-3
            ${
              results.results.length === 0
                ? "border-sky-600"
                : results.results.find((result) => {
                    return result.id === question.id;
                  })?.correct
                ? "border-green-600"
                : "border-red-600"
            }`}
            >
              <h3 className="text-xl font-semibold">
                {i + 1}. {question.text}
              </h3>
              {question.answers.map((answer, j) => (
                <div key={answer.id} className="flex gap-2 items-center">
                  <RadioGroupItem
                    key={i}
                    value={answer.text}
                    checked={answers[i].answer === j + 1}
                    onClick={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[i] = {
                        questionId: question.id,
                        answerId: answer.id,
                        answer: j + 1,
                      };
                      setAnswers(newAnswers);
                    }}
                  />
                  <span>
                    {String.fromCharCode(97 + j)}) {answer.text}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </React.Fragment>
        ))
      )}
      {session && (
        <div className="flex justify-center">
          {test && (
            <TestControll
              answers={answers}
              topicNumber={topicId}
              onResults={handleAnswersUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TestPage;
