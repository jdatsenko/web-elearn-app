"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import SimpleImage from "@editorjs/simple-image";
//@ts-ignore
import FontSizeTool from "editorjs-inline-font-size-tool";
import { Button } from "@/components/ui/button";

export default function Topic({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const isAuthorized = status === "authenticated";
  const router = useRouter();

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
            blocks: response.data.data.content.map((e: string) =>
              JSON.parse(e)
            ),
          });
        },
        readOnly: true,
        tools: {
          image: SimpleImage,
          fontSize: FontSizeTool,
        },
      });
    });
  }, []);

  return (
    <div className="h-full mx-auto flex flex-col justify-center align-center w-full overflow-y-auto">
      <div id="editorjs"></div>
      <div className="mx-auto my-5">
        {isAuthorized && session.user.topicsCompleted >= topicId - 1 && (
          <Button onClick={() => router.push(`/test/${topicId}`)}>
            Začať testovanie
          </Button>
        )}

        {!isAuthorized && (
          <div className="text-red-500">
            Musíte byť autorizovaný, aby ste mohli začať testovanie.
          </div>
        )}

        {isAuthorized && session.user.topicsCompleted < topicId - 1 && (
          <div className="text-red-500">
            Pre testovanie tejto témy musíte dokončiť predchádzajúce témy.
          </div>
        )}
      </div>

      <style>{`

      .codex-editor__redactor{
          padding-bottom: 10px !important;
        }
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
