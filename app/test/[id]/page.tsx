"use client";
import TestControll from "@/app/components/controll/page";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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
}

const TestPage = ({ params }: { params: { id: string } }) => {
  const topicId = parseInt(params.id);
  const { data: session } = useSession();
  const [test, setTest] = useState<TestResponse>();
  const [answers, setAnswers] = useState<
    { questionId: number; answer: number; answerId: number }[]
  >([]);
  useEffect(() => {
    axios
    .get("/api/tests/test", {
      params: {
        id: topicId,
      },
    })
    .then((res) => {
      console.log(res.data);
      const resTest = res.data as TestResponse;
      setTest(res.data);
      setAnswers(
        resTest.questions.map((question) => ({
          questionId: question.id,
          answerId: 0,
          answer: 0,
        }))
      );
    })
    .catch((error) => {
      console.error("Error fetching test data:", error);
    });
  
  }, []);

  return (
    <div>
      {!session ? (
        <div className="text-red-500 text-3xl font-bold text-center mt-10">
          Musíte byť autorizovaný, aby ste mohli začať testovanie.
        </div>
      ) : session.user && session.user.topicsCompleted < topicId - 1 ? (
        <div className="text-red-500 text-3xl font-bold text-center mt-10">
          Pre testovanie tejto témy musíte dokončiť predchádzajúce témy.
        </div>
      ) : (
        test &&
        test.questions.map((question, i) => (
          <RadioGroup
            key={question.id}
            className="flex flex-col space-y-1 mb-2 border-solid border-2 border-sky-600 m-5 rounded-md p-3"
          >
            <h3 className="text-xl font-semibold">{question.text}</h3>
            {question.answers.map((answer, j) => (
              <div className="flex gap-2 items-center" key={answer.id}>
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
                    console.log(newAnswers);
                  }}
                />
                <span>{answer.text}</span>
              </div>
            ))}
          </RadioGroup>
        ))
      )}
      {session && session?.user?.topicsCompleted !== undefined && session?.user?.topicsCompleted >= topicId - 1 && (
        <div className="flex justify-center">
          {test && <TestControll answers={answers} testId={topicId} />}
        </div>
      )}
    </div>
  );
};  

export default TestPage;
