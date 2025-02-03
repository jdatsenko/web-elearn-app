"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowToTop } from "@/components/ui/arrow-to-top";

export default function TopicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams<{ id: string }>();
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topic/card");
        const data = await response.json();
        if (data.data) {
          setTopics(data.data);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);
  return (
    <>
      <div className="flex h-full w-full">
        <ArrowToTop className="fixed bottom-6 right-6 z-[999]"/>
        {params.id !== "1" && (
          <div
            className=" cursor-pointer fixed h-full flex justify-center items-center px-6 md:px-10"
            onClick={() => {
              router.push(`/topics/${parseInt(params.id) - 1}`);
            }}
          >
            <i className="bi bi-arrow-left text-base md:text-2xl"></i>
          </div>
        )}
        <div className="flex flex-wrap justify-center h-full w-full overflow-y-auto">
          {children}
        </div>
        {params.id !== topics.length.toString() && (
          <div>
            <div
              className="fixed cursor-pointer h-full flex justify-center items-center px-6 md:px-10 right-0"
              onClick={() => {
                router.push(`/topics/${parseInt(params.id) + 1}`);
              }}
            >
              <i className="bi bi-arrow-right text-base md:text-2xl absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
