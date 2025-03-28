"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowToTop } from "@/components/ui/arrow-to-top";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense, useCallback } from "react";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TeacherPageSkeleton from "../components/skeletons/TeacherPageSkeleton";

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
  return (
    <Suspense>
      <TestContent />
    </Suspense>
  );
}

function TestContent() {
  const [newTopic, setNewTopic] = useState<Topic>({
    title: "",
    description: "",
    content: [""],
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = parseInt(searchParams.get("topicId") || "0");
  const isTeacher = session?.user?.role === "TEACHER";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topicId) {
      axios
        .get(`/api/topic/get?id=${topicId}`)
        .then((res) => {
          const { title, description, content } = res.data.data;
          setNewTopic({ title, description, content });
        })
        .catch(() => setErrorMessage("Chyba pri načítaní témy."));

      axios
        .get(`/api/tests/test?id=${topicId}`)
        .then((res) => {
          if (res.data) {
            setQuestions(
              res.data.questions.map((question: any) => ({
                label: question.text,
                answers: question.answers.map((answer: any) => ({
                  label: answer.text,
                  isRight: answer.isCorrect,
                  number: answer.id,
                })),
              }))
            );
          }
          setTimeout(() => {
            setLoading(false);
          }, 300);
        })
        .catch(() => setErrorMessage("Chyba pri načítaní testu."));
    } else {
      setNewTopic({
        title: "",
        description: "",
        content: [""],
      });
      setQuestions([]);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [topicId]);

  const onCKChange = useCallback((event: any, value: any) => {
    setNewTopic((prevState) => ({
      ...prevState,
      content: [value.getData()],
    }));
  }, []);

  const onSave = async () => {
    try {
      const topicData = {
        title: newTopic.title,
        description: newTopic.description,
        content: newTopic.content,
      };
      setErrorMessage("");
      if (!topicData.title || topicData.title.trim() === "") {
        setErrorMessage("Názov témy nemôže byť prázdny");
        return;
      } else if (
        !topicData.description ||
        topicData.description.trim() === ""
      ) {
        setErrorMessage("Popis témy nemôže byť prázdny");
        return;
      } else if (
        !topicData.content ||
        topicData.content.length === 0 ||
        topicData.content.every((c) => c.trim() === "")
      ) {
        setErrorMessage("Obsah témy nemôže byť prázdny");
        return;
      }

      if (questions.length === 0) {
        setErrorMessage("Zadajte aspoň jednu otázku");
        return;
      } else if (questions.some((q) => q.label.trim() === "")) {
        setErrorMessage("Otázky nemôžu byť prázdne");
        return;
      } else if (questions.some((q) => !q.answers.some((a) => a.isRight))) {
        setErrorMessage(
          "Každá otázka musí obsahovať aspoň jednu správnu odpoveď"
        );
        return;
      } else if (
        questions.some((q) => q.answers.some((a) => a.label.trim() === ""))
      ) {
        setErrorMessage("Odpovede nemôžu byť prázdne");
        return;
      } else if (questions.some((q) => q.answers.length < 2)) {
        setErrorMessage(`Otázka musí mať aspoň 2 odpovede`);
        return;
      }

      if (topicId) {
        await axios.put(`/api/topic/update`, { topicId, ...topicData });
        await axios.put(`/api/tests/test`, {
          topicId,
          questions: questions.map((question) => ({
            label: question.label,
            answers: question.answers.map((answer) => ({
              label: answer.label,
              isRight: answer.isRight,
              number: answer.number,
            })),
          })),
        });
        setSuccessMessage("Téma bola úspešne upravená.");
        setTimeout(() => {
          router.push(`/topics/${topicId}`);
        }, 300);
        return;
      }

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
      setErrorMessage("Chyba pri vytváraní témy alebo testu");
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { label: "", answers: [{ label: "", isRight: false, number: 0 }] },
    ]);
  };

  if(loading){
    return <TeacherPageSkeleton />
  }

  if (!isTeacher) {
    return (
      <div>
        <p className="text-red-500 my-5 text-center">
          Nemáte prístup. Najprv treba podať{" "}
          <Link
            className="underline font-bold hover:text-red-700"
            href={"/teacherRequestForm"}
          >
            žiadosť o rolu učiteľa.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="my-4 mx-5 md:mx-60">
        <p className="text-4xl mb-5 text-center">
          {topicId
            ? "Formulár na úpravu existujúcej témy"
            : "Formulár na pridanie novej témy"}
        </p>

        <div className="flex flex-col gap-y-4">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium">
              Názov
            </Label>
            <Textarea
              id="title"
              name="title"
              value={newTopic.title}
              onChange={(e) => {
                setNewTopic({ ...newTopic, title: e.target.value });
                setErrorMessage("");
              }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium">
              Popis
            </Label>
            <Textarea
              id="description"
              name="description"
              value={newTopic.description}
              onChange={(e) => {
                setNewTopic({ ...newTopic, description: e.target.value });
                setErrorMessage("");
              }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
      </div>
      <Separator className="my-8 sm:my-[40px]" />
      <div className="mx-5 md:mx-60">
        <p className="text-2xl my-4 text-center">Obsah témy</p>
        <ClassicCKEditor
          data={newTopic.content?.[0] || " "}
          onChange={onCKChange}
        />
      </div>

      <Separator className="my-8 sm:my-[40px]" />
      <div className="px-4 mx-5 md:mx-20 mt-2">
        <p className="text-3xl mt-10 text-center">Pridanie testu do témy</p>
        {questions?.map((question, index) => (
          <div key={index}>
            <div className="my-4">
              <p className="inline-block px-2 py-2 bg-gray-500 mb-3 text-background rounded-lg shadow-md font-semibold">
                Otázka {index + 1}
              </p>
              <div className="flex">
                <span className="mr-1 flex items-center text-xl">
                  {index + 1}.
                </span>
                <Input
                  id="question"
                  className="border border-gray-400"
                  value={question.label}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index] = {
                      ...newQuestions[index],
                      label: e.target.value,
                    };
                    setQuestions(newQuestions);
                    setErrorMessage("");
                  }}
                />
              </div>
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
                          setErrorMessage("");
                        }}
                      ></RadioGroupItem>
                      <Input
                        id="answer"
                        className="border border-gray-400"
                        value={answer.label}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].answers[index2] = {
                            ...newQuestions[index].answers[index2],
                            label: e.target.value,
                          };
                          setQuestions(newQuestions);
                          setErrorMessage("");
                        }}
                      />
                      <Button
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].answers.splice(index2, 1);
                          setQuestions(newQuestions);
                          setErrorMessage("");
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
                  setErrorMessage("");
                }}
                className="mt-2 mr-2"
              >
                Pridať odpoveď
              </Button>
              <Button
                onClick={() => {
                  const newQuestions = questions.filter((_, i) => i !== index);
                  setQuestions(newQuestions);
                  setErrorMessage("");
                }}
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Vymazať túto otázku
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-10 flex flex-row gap-4">
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
            --ck-spacing-unit: 2em;
          }
          html.dark {
            --ck-color-base-background: hsl(0deg 0% 0%);
            --ck-color-base-border: hsl(209, 92%, 70%);
            --ck-color-base-text: hsl(0deg 0% 100%);
          }
          html.dark {
            --ck-color-base-background: hsl(0deg 0% 8%);
            --ck-color-base-border: hsl(216, 12%, 84%);
            --ck-color-base-text: hsl(0deg 0% 100%);
            --ck-color-button-on-background: hsl(0, 0%, 17% / 0.88);
            --ck-color-button-on-color: hsl(0, 0%, 100%);
            --ck-color-button-on-hover-background: hsl(0, 0%, 17% / 0.88);
            --ck-color-button-default-hover-background: hsl(0, 0%, 17%);
            --ck-color-button-default-active-background: hsl(0, 0%, 17%);
          }
          .ck-editor__editable_inline {
            min-height: 300px;
          }
          figure.image {
            background: white;  
            width: fit-content;
            height: 100%;
            margin: 0 auto;
          }
          `}
        </style>

        <ArrowToTop className="fixed bottom-6 right-6 z-[999]" />
      </div>
    </>
  );
}
