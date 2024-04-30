"use client";
import Topic6 from "@/app/components/topics/Topic6"
import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import SimpleImage from "@editorjs/simple-image";
//@ts-ignore
import FontSizeTool from 'editorjs-inline-font-size-tool'; 

export default function Topic({ params }: { params: { id: string } }) {
  // Assuming you use useSession hook
  const { data: session, status } = useSession();

  const topicId = parseInt(params.id);

  const [editorData, setEditorData] = useState<any>({});
  const editor = useRef<EditorJS>();

  useEffect(() => {
    axios.get(`/api/topic/get?id=${topicId}`).then((response) => {
      setEditorData(response.data);
      const e = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          console.log("Editor.js is ready to work!");
          editor.current = e as EditorJS;
          editor.current.render({
            blocks: response.data.data.content.map((e: string) => JSON.parse(e)),
          });
        },
        readOnly: true,
        tools: {
          image: SimpleImage,
          fontSize: FontSizeTool, // Add the font size tool here
        },
      });
    });
  }, []);

  return (
    <div className="h-full mx-auto flex justify-center align-center w-full overflow-y-auto">
        <div id="editorjs"></div>

      <style>{`

        .ce-block{
          margin: auto; !important;
        }
          .ce-block__content,
          .ce-toolbar__content {
            max-width: 70% !important;
          }
          .cdx-block {
            max-width: 100% !important;
            margin: 20px 0 !important;
          }
          .ce-paragraph.cdx-block {
            width: 100% !important;
        }
          .cdx-simple-image .cdx-input {
            width: 50% !important;
            margin: 30px auto !important;
            text-align: center;
            }

        }
      `}</style>
    </div>
  );
}