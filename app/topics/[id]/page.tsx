"use client";
import Topic1 from "@/app/components/topics/Topic1"
import Topic2 from "@/app/components/topics/Topic2"
import Topic3 from "@/app/components/topics/Topic3"
import Topic4 from "@/app/components/topics/Topic4"
import Topic5 from "@/app/components/topics/Topic5"
import Topic6 from "@/app/components/topics/Topic6"
import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";

import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";

export default function Topic({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession(); // Assuming you use useSession hook

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
          editor.current.render({ blocks: response.data.data.content.map((e: string) => JSON.parse(e)) });
        },
        readOnly: true,
        tools: {
          image: SimpleImage,
        },
      });
    });
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto">
        <div id="editorjs"></div>

      {/* Responsive Styling */}
      <style jsx>{`
        @media (max-width: 640px) {
          .w-full {
            width: 100%; /* Set full width on smaller screens */
          }
        }
      `}</style>
    </div>
  );
}