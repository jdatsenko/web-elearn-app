"use client";

import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


interface Topic {
    number?: number;
    title?: string;
    description?: string;
    content?: string[];
  }
  
  export default function Test() {
    const [newTopic, setNewTopic] = useState<Topic>({
      number: 0,
      title: "",
      description: "",
    });
  
    const editorRef = useRef<EditorJS | null>(null);
  
    useEffect(() => {
      import("@editorjs/editorjs").then((EditorJS) => {
         // @ts-ignore
        import("@editorjs/simple-image").then((SimpleImage) => {
          editorRef.current = new EditorJS.default({
            holder: "editorjs",
            onReady: () => {
              console.log("Editor.js is ready to work!");
            },
            tools: {
              image: SimpleImage,
            },
          });
        });
      });
    }, []);
  
    const onSave = async () => {
      if (!editorRef.current) return;
  
      const outputData = await editorRef.current.save();
      const content = outputData.blocks.map((e) => JSON.stringify(e));
      const res = await axios.post("/api/topic/create", {
        number: newTopic.number,
        title: newTopic.title,
        description: newTopic.description,
        content,
      });
    };
  return (
    <>
     <div className="my-4 mx-20">
            <label
                htmlFor="topicNumber"
                className="block text-lg font-medium text-gray-200"
            >
                Topic number
            </label>
            <Input
                id="topicNumber"
                value={newTopic.number}
                onChange={(e) => setNewTopic({ ...newTopic, number: parseInt(e.target.value) })}
            />
        </div>
      <div className="my-4 mx-20">
        <label
          htmlFor="title"
          className="block text-lg font-medium text-gray-200"
        >
          Title
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
          className="block text-lg font-medium text-gray-200"
        >
          Description
        </label>
        <Input
          id="description"
          value={newTopic.description}
          onChange={(e) =>
            setNewTopic({ ...newTopic, description: e.target.value })
          }
          className="h-60"
        />
      </div>
      <div className="text-center mb-10">
        <h1 className="text-3xl">Content</h1>
      </div>
      <div className="mx-60 border flex align-center justify-center border-gray-300 p-4 rounded-md">
        <div id="editorjs" className="mb-4 w-full"></div>
      </div>
      <div className="flex justify-center items-center my-8 mx-auto">
        <Button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
            Save
        </Button>
      </div>
    </>
  );
}
