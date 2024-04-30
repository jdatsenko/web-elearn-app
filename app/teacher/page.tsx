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
    const [successMessage, setSuccessMessage] = useState<string>("");

  
    const editorRef = useRef<EditorJS | null>(null);
  
    useEffect(() => {
        (async () => {
          const EditorJS = (await import("@editorjs/editorjs")).default;
          // @ts-ignore
          const SimpleImage = (await import("@editorjs/simple-image")).default;
          // @ts-ignore
            const FontSizeTool = (await import('editorjs-inline-font-size-tool')).default;
      
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
    
        const outputData = await editorRef.current.save();
        const content = outputData.blocks.map((e) => JSON.stringify(e));
        const res = await axios.post("/api/topic/create", {
          number: newTopic.number,
          title: newTopic.title,
          description: newTopic.description,
          content: content,
        });
        setSuccessMessage("Topic successfully updated!");

    }
    catch (error) {
        console.error("Error creating topic:", error);
        setSuccessMessage("Error. Topic with this number might already exist");
      }
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
      <div className="border mx-auto w-11/12 flex align-center justify-center border-gray-300 rounded-md">
        <div id="editorjs" className="mb-4 mx-10 w-full"></div>
      </div>
      {successMessage && (
        <div className="text-green-600 font-bold text-center">
          {successMessage}
        </div>
      )}
      <div className="flex justify-center items-center my-8 mx-auto">
        <Button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
            Save
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
      </div>
      
    </>
  );
}
