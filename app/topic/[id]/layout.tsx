"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowToTop } from "@/components/ui/arrow-to-top";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

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

  const maxTopicId = topics.length;
  const topicId = parseInt(params.id, 10) || null;

  const goToPrevious = () => {
    if (topicId && topicId > 1) {
      router.push(`/topic/${topicId - 1}`);
    }
  };

  const goToNext = () => {
    if (topicId && topicId < maxTopicId) {
      router.push(`/topic/${topicId + 1}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [topicId, maxTopicId]);

  return (
    <>
      <div className="flex h-full w-full">
        <ArrowToTop className="fixed md:bottom-6 bottom-12   right-6 z-[999]" />
        {topicId && topicId !== 1 && (
          <div
            className=" cursor-pointer fixed h-full flex justify-center items-center px-6 md:px-10"
            onClick={goToPrevious}
          >
            <Button variant="outline" size="icon">
              <ChevronLeft />
            </Button>
          </div>
        )}
        <div className="flex flex-wrap justify-center h-full w-full overflow-y-auto">
          {children}
        </div>
        {topicId && topicId !== topics.length && (
          <div>
            <div
              className="fixed cursor-pointer h-full flex justify-center items-center px-6 md:px-10 right-0"
              onClick={goToNext}
            >
              <Button variant="outline" size="icon">
                <ChevronRight />
              </Button>
            </div>
          </div>
        )}
        <style>{`
          figure.image {
            background: white;  
            width: fit-content;
            height: 100%;
            margin: 0 auto;
          }
        `}</style>
      </div>
    </>
  );
}
