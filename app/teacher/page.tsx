"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowToTop } from "@/components/ui/arrow-to-top";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import React, { useState } from "react";

export interface Question {
  label: string;
  answers: Answer[];
}

export interface Answer {
  label: string;
  isRight: boolean;
  number: number;
}

interface Topic {
  title?: string;
  description?: string;
  content?: string[];
}

const ClassicCKEditor = dynamic(
  () => import("../components/CKEditor/ClassicCKEditor"),
  { ssr: false }
);

export default function Test() {
  const [newTopic, setNewTopic] = useState<Topic>({
    title: "",
    description: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const onCKChange = useCallback((event: any, value: any) => {
    setNewTopic({ ...newTopic, content: [value.getData()] });
  }, []);

  const onSave = async () => {
    try {
      if (questions.length === 0) {
        setErrorMessage("Zadajte aspoň jednu otázku");
        return;
      }
      const topicData = {
        title: newTopic.title,
        description: newTopic.description,
        content: newTopic.content,
      };
      const topicRes = await axios.post("/api/topic/create", topicData);
      setSuccessMessage("Téma bola úspešne vytvorená.");

      const testData = {
        topicId: topicRes.data.topic.id,
        topicNumber: topicRes.data.topic.topicNumber,
        questions: questions.map((question) => ({
          label: question.label,
          answers: question.answers.map((answer) => ({
            label: answer.label,
            isRight: answer.isRight,
            number: answer.number,
          })),
        })),
      };
      await axios.post("/api/tests/test", testData);
      setTimeout(() => {
        router.push(`/topics/${topicRes.data.topic.topicNumber}`);
      }, 300);
    } catch (error) {
      console.error("Error creating topic or test:", error);
      setSuccessMessage("Error creating topic or test");
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { label: "", answers: [{ label: "", isRight: false, number: 0 }] },
    ]);

    console.log(questions);
  };
  return (
    <>
      <div className="my-4 mx-60">
        <Label htmlFor="experience" className="block text-sm font-medium">
          Názov
        </Label>
        <Textarea
          id="title"
          name="title"
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        ></Textarea>
      </div>
      <div className="my-4 mx-60">
        <Label htmlFor="description" className="block text-sm font-medium">
          Popis
        </Label>
        <Textarea
          id="description"
          name="description"
          value={newTopic.description}
          onChange={(e) =>
            setNewTopic({ ...newTopic, description: e.target.value })
          }
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        ></Textarea>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-3xl">Obsah témy</h1>
      </div>
      <div className="mx-60">
        <ClassicCKEditor data={"<p>Zadajte obsah</p>"} onChange={onCKChange} />
      </div>

      <div className="px-4 mt-2">
        {questions?.map((question, index) => (
          <div key={index}>
            <div className="mb-4">
              Otázka {index + 1}:
              <Input
                id="question"
                value={question.label}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index] = {
                    ...newQuestions[index],
                    label: e.target.value,
                  };
                  setQuestions(newQuestions);
                }}
              />
            </div>
            <div>
              <RadioGroup key={index}>
                {question.answers.map((answer, index2) => (
                  <>
                    <div className="flex flex-row gap-4 align-center justify-center items-center">
                      <RadioGroupItem
                        key={index2}
                        value={""}
                        checked={answer.isRight}
                        id="answer"
                        onClick={(e) => {
                          const newQuestions = [...questions];
                          //all answers are not right
                          newQuestions[index].answers.forEach(
                            (a) => (a.isRight = false)
                          );
                          // set the right answer
                          newQuestions[index].answers[index2] = {
                            ...newQuestions[index].answers[index2],
                            isRight: true,
                          };
                          setQuestions(newQuestions);
                        }}
                      ></RadioGroupItem>
                      <Input
                        id="answer"
                        value={answer.label}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].answers[index2] = {
                            ...newQuestions[index].answers[index2],
                            label: e.target.value,
                          };
                          setQuestions(newQuestions);
                        }}
                      />
                      <Button
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].answers.splice(index2, 1);
                          setQuestions(newQuestions);
                        }}
                      >
                        Odstrániť
                      </Button>
                    </div>
                  </>
                ))}
              </RadioGroup>
              <Button
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions[index].answers.push({
                    label: "",
                    isRight: false,
                    number: 0,
                  });
                  setQuestions(newQuestions);
                }}
                className="mt-2"
              >
                Pridať odpoveď
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-10 flex flex-row gap-4">
          <Button onClick={() => setQuestions([])}>Vymazať</Button>
          <Button onClick={addQuestion}>Pridať otázku</Button>
        </div>
      </div>

      {successMessage && (
        <div className="text-green-600 my-5 font-bold text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 my-5 font-bold text-center">
          {errorMessage}
        </div>
      )}
      <div className="flex justify-center items-center my-8 mx-auto">
        <Button
          onClick={onSave}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Uložiť tému
        </Button>

        <style>
          {`
          :root{
            --ck-color-base-border: hsl(var(--primary));
          }
          html.dark {
            --ck-color-base-background: hsl(0deg 0% 0%);
            --ck-color-base-border: hsl(209, 92%, 70%);
            --ck-color-base-text: hsl(0deg 0% 100%);
          }
          `}
        </style>
        
        <ArrowToTop className="fixed bottom-6 right-6 z-[999]" />
      </div>
    </>
  );
}
