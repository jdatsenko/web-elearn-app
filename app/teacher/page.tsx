"use client";
import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowToTop } from "@/components/ui/arrow-to-top";

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

export default function Test() {
  const [newTopic, setNewTopic] = useState<Topic>({
    title: "",
    description: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter();

  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    (async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      // @ts-ignore
      const SimpleImage = (await import("@editorjs/simple-image")).default;
      // @ts-ignore
      const FontSizeTool = (await import("editorjs-inline-font-size-tool"))
        .default;

      const editorInstance = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        tools: {
          image: SimpleImage,
          fontSize: FontSizeTool,
        },
      });

      editorRef.current = editorInstance;
    })();
  }, []);

  const onSave = async () => {
    try {
      if (!editorRef.current) return;
      if (questions.length === 0) {
        setErrorMessage("Zadajte aspoň jednu otázku");
        return;
      }
      const outputData = await editorRef.current.save();
      const content = outputData.blocks.map((e) => JSON.stringify(e));
      const topicData = {
        title: newTopic.title,
        description: newTopic.description,
        content: content,
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
            number: answer.number
          })),
        })),
      };
      console.log("here2 testDATA", testData);

      const testRes = await axios.post("/api/tests/test", testData);
      console.log("here3", testRes);
  
      const timer = setTimeout(() => {
        router.push(`/topics/${topicRes.data.topic.topicNumber}`);
      }, 700);
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
      <div className="my-4 mx-20">
        <label
          htmlFor="title"
          className="block text-lg font-medium"
        >
          Názov
        </label>
        <Input
          id="title"
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
        />
      </div>
      <div className="mb-10 mx-20">
        <label
          htmlFor="description"
          className="block text-lg font-medium"
        >
          Popis
        </label>
        <Input
          id="description"
          value={newTopic.description}
          onChange={(e) =>
            setNewTopic({ ...newTopic, description: e.target.value })
          }
        />
      </div>
      <div className="text-center mb-10">
        <h1 className="text-3xl">Obsah témy</h1>
      </div>
      <div className="border mx-auto w-11/12 flex align-center justify-center border-gray-300 rounded-md">
        <div id="editorjs" className="mb-4 mx-10 w-full"></div>
      </div>

      <div className="px-4 mt-2">
        {questions?.map((question, index) => (
          <div key={index} >
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
                <RadioGroupItem key={index2} 
                    value={''}
                    checked={answer.isRight}
                    id="answer"
                    onClick={(e) => {
                      const newQuestions = [...questions];
                      //all answers are not right 
                      newQuestions[index].answers.forEach((a) => a.isRight = false);
                      // set the right answer
                      newQuestions[index].answers[index2] = {
                        ...newQuestions[index].answers[index2],
                        isRight: true,
                      };
                      setQuestions(newQuestions);
                    }}>
                  </RadioGroupItem>
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
      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
    >
      Uložiť tému
    </Button>
   
        <style>
          {`
          .ce-block__content,
          .ce-toolbar__content {
            max-width: calc(100% - 150px) !important;
          }
          .cdx-block {
            max-width: 100% !important;
          }
          .ce-paragraph.cdx-block {
            width: 100% !important;
        }
          .cdx-simple-image .cdx-input {
            width: 50% !important;
            margin: 30px auto !important;
            text-align: center;
            }
        `}
        </style>
         <ArrowToTop className="fixed bottom-6 right-6 z-[999]"/>
      </div>
    </>
  );
}
