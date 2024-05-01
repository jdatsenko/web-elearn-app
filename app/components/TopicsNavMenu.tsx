import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Item } from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";
interface Topic {
  title: string;
  description: string;
  topicNumber: number; // Добавляем поле topicNumber
}

const TopicsNavMenu = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topic/card");
        const data = await response.json();
        setTopics(data.data); // Используйте data.data вместо data.topics
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="pb-4 flex text-center flex-row">
      {topics.map((topic) => (
        <div key={topic.topicNumber}>
          <div key={topic.title}>
            <div className="flex flex-row">
              <Link href={`/topics/${topic.topicNumber}`}>
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "px-10 justify-start text-center my-[3px] mx-[8px] border hover:border-blue-500 hover:border-solid hover:border-1"
                  )}
                >
                  <span className="text-muted-foreground">
                    {topic.topicNumber}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicsNavMenu;


