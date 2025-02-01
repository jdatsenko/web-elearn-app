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
  const { data: session, status } = useSession() as {
    data: any;
    status: string;
  };
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
          editor.current = e as EditorJS;
          //TODO try catch
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
      <div className="mx-14 md:mx-20" id="editorjs"></div>
      <div className="mx-auto my-5">
        {status === "loading" && (
          <div>
            {isAuthorized &&
              session?.user?.topicsCompleted !== undefined &&
              session?.user?.topicsCompleted >= topicId - 1 && (
                <div>
                  <Button
                    className="mr-4"
                    onClick={() => router.push(`/test/${topicId}`)}
                  >
                    Začať testovanie
                  </Button>
                  <Button onClick={() => router.push(`/topics/${topicId + 1}`)}>
                    Ďalšia téma
                  </Button>
                </div>
              )}

            {!isAuthorized && (
              <div>
                <div className="flex justify-center">
                  <Button onClick={() => router.push(`/topics/${topicId + 1}`)}>
                    Ďalšia téma
                  </Button>
                </div>
                <div className="text-red-500 mt-5">
                  Musíte byť autorizovaný, aby ste mohli začať testovanie.
                  <a
                    href="/auth/login"
                    className="text-red-500 font-bold ml-3 underline"
                  >
                    Prihlásiť sa
                  </a>
                </div>
              </div>
            )}

            {isAuthorized &&
              session?.user?.topicsCompleted !== undefined &&
              session?.user?.topicsCompleted < topicId - 1 && (
                <div className="text-red-500">
                  Pre testovanie tejto témy musíte dokončiť predchádzajúce témy.
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={() => router.push(`/topics/${topicId + 1}`)}
                    >
                      Ďalšia téma
                    </Button>
                  </div>
                </div>
              )}
          </div>
        )}

        <div>Načítanie...</div>
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
