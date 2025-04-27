"use client";
import "./topics.css";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowToTop } from "@/components/ui/arrow-to-top";
import TopicStats from "./TopicsStats";
import LpwanBenefits from "./LpwanBenefits";
import axios from "axios";
import AboutCourse from "./AboutCourse";
import AboutRoles from "./AboutRoles";
import Footer from "./Footer";
import TopicCard from "./TopicCard";

interface Topic {
  topicNumber: number;
  title: string;
  description: string;
  createdById: number;
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const HomePageSkeleton = dynamic(
    () => import("../skeletons/HomePageSkeleton"),
    { ssr: false }
  );
  const isTeacher = session?.user?.role === "TEACHER";

  const deleteTopic = async (topicNumber: number) => {
    try {
      const response = await axios.delete("/api/topic/delete", {
        data: { topicNumber },
      });
      setTopics((prevTopics) =>
        prevTopics.filter((topic) => topic.topicNumber !== topicNumber)
      );
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topic/card");
        const data = await response.json();
        if (data.data) {
          setTopics(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <section className="px-4 sm:px-16 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[40px]">
          Webová e-learningová aplikácia pre LPWAN
        </h1>
        {isTeacher ? (
          <TopicStats topics={topics} />
        ) : (
          <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[20px]">
            Témy
          </h1>
        )}
       <div className="grid grid-cols-1 md:grid-cols-3 mb-5 gap-10 mx-auto">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.topicNumber}
              topic={topic}
              index={index}
              isTeacher={isTeacher}
              currentUserId={session?.user?.id}
              onDelete={deleteTopic} 
            />
          ))}
        </div>

        <Separator className="my-8 sm:my-[10px]x  " />
        <AboutCourse />
        <Separator className="my-2 sm:my-[10px]" />

        <AboutRoles session={session} isTeacher={isTeacher} />
        <Separator className="my-8 sm:my-[40px]" />

        <LpwanBenefits />
        <ArrowToTop className="fixed bottom-6 right-6 z-[999]" />

        <Separator className="my-8 sm:my-[40px]" />
        <Footer />
      </section>
    </>
  );
};

export default Topics;
