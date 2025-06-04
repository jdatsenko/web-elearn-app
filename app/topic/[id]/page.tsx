"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import FontSizeTool from "editorjs-inline-font-size-tool";
import { Button, buttonVariants } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Stats from "./Stats";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TestStats {
  topicNumber: number;
  day: Date;
  users_completed: number;
}

export default function Topic({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession() as {
    data: any;
    status: string;
  };
  const isAuthorized = status === "authenticated";
  const router = useRouter();
  const topicId = parseInt(params.id);
  const [loading, setLoading] = useState(true);
  const isTeacher = session?.user?.role === "TEACHER" || session?.user?.role === "ADMIN";
  const [editorData, setEditorData] = useState<any>(null);
  const editor = useRef<EditorJS | null>(null);
  const [length, setLength] = useState(0);
  const { toast } = useToast();
  const TopicSkeleton = dynamic(
    () => import("@/app/components/skeletons/TopicSkeleton"),
    { ssr: false }
  );

  const [testStats, setTestStats] = useState<TestStats[]>([]);
  const chartData: { date: string; users: number }[] = [];

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`/api/topic/get?id=${topicId}`);
        setEditorData(response.data.data);
        setLength(response.data.length);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Chyba pri načítaní témy",
          description:
            (error as any).response?.data?.message ||
            "Téma nebola nájdená alebo neexistuje.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();

    return () => {
      if (editor.current) {
        editor.current.destroy();
        editor.current = null;
      }
    };
  }, [topicId]);

  useEffect(() => {
    try {
      if (!loading && editorData && !editor.current) {
        if (!editorData) {
          toast({
            variant: "destructive",
            title: "Chyba pri načítaní témy",
            description: "Téma nebola nájdená alebo neexistuje.",
          });
        }
        const holderElement = document.getElementById("editorjs");
        if (holderElement) {
          editor.current = new EditorJS({
            holder: "editorjs",
            readOnly: true,
            tools: {
              image: SimpleImage,
              fontSize: FontSizeTool,
            },
            data: {
              blocks: editorData.content?.map((item: string) =>
                JSON.parse(item)
              ),
            },
          });
        } else {
          console.error("Element with ID 'editorjs' not found.");
        }
      }
    } catch (error) {
      if ((error as any).name === "SyntaxError") {
        const errorElement = document.getElementById("ckstyle");
        if (errorElement) {
          errorElement.innerHTML += editorData.content;
        }
      } else {
        console.error("Error initializing EditorJS:", error);
      }
    }
  }, [loading, editorData]);

  if (isTeacher) {
    useEffect(() => {
      const fetchTestStats = async () => {
        try {
          const response = await axios.get(`/api/topic/stats?id=${topicId}`);
          if (!response.data) {
            return;
          }
          setTestStats(response.data.data);
        } catch (error) {
          return;
        }
      };
      fetchTestStats();
    }, []);
  }

  if (testStats) {
    testStats.forEach((topic) => {
      chartData.push({
        date: new Date(topic.day).toLocaleDateString("sk-SK", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        users: topic.users_completed,
      });
    });
  }

  if (loading) return <TopicSkeleton />;

  if (!editorData) {
    return (
      <div className="text-red-500 text-3xl font-bold text-center mt-10">
        Téma s ID {topicId} nebola nájdená alebo neexistuje.
      </div>
    );
  }

  return (
    <div>
      <div className="h-full mx-auto flex flex-col justify-center align-center w-full overflow-y-auto">
        {isTeacher && (
          <div className="md:absolute md:top-20 md:left-4 mx-auto mb-3 md:mb-0 mt-5 md:mt-0">
            <Button
              className="mr-2"
              onClick={() => router.push(`/createTopic?topic=${topicId}`)}
            >
              Upraviť tému
            </Button>
            {testStats && <Stats chartData={chartData} />}
          </div>
        )}
        <div className="mx-14 md:mx-20" id="editorjs"></div>
        <div className="mx-14 md:mx-0 md:mt-10">
          <div id="ckstyle" className="mx-4 md:w-5/6 lg:w-1/2 md:mx-auto">
            <p className="text-3xl font-bold my-5">
              {editorData.topicNumber}. {editorData.title}
            </p>
          </div>
        </div>
        <div className="mx-auto my-5">
          {status !== "loading" && (
            <div
              className={`mb-10 justify-center items-center ${
                isAuthorized ? "flex" : ""
              }`}
            >
              {isAuthorized ? (
                <Button
                  className="mr-2"
                  onClick={() => router.push(`/test/${topicId}`)}
                >
                  Začať testovanie
                </Button>
              ) : (
                <div className="auth-warn text-red-500 text-center mb-2">
                  Musíte byť autorizovaný, aby ste mohli začať testovanie.
                  <a
                    href="/auth/login"
                    className="text-red-500 font-bold ml-3 underline"
                  >
                    Prihlásiť sa
                  </a>
                </div>
              )}
              <div className={`justify-center items-center flex`}>
                {length !== topicId && (
                  <div>
                    <Button
                      className={cn(buttonVariants({ variant: "secondary" }))}
                      onClick={() => router.push(`/topic/${topicId + 1}`)}
                    >
                      Ďalšia téma
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <style>{`
        .codex-editor__redactor {
          padding-bottom: 10px !important;
        }
        .ce-block {
          margin: auto !important;
        }
        @media (min-width: 1024px) {
          .ce-block__content,
          .ce-toolbar__content {
            max-width: 70% !important;
          }
        }
        .ce-block--selected .ce-block__content{
        background-color: #8080805c !important;
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
          text-align: center !important;
        }
        .test-warning::selection , .auth-warn::selection {
          color: black;
          background:rgba(142, 141, 141, 0.63);
        }
      `}</style>
      </div>
    </div>
  );
}
