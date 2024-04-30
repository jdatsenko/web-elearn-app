import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Item } from "@radix-ui/react-radio-group";

export default function TopicsNavMenu() {
  const topics = [
    {
      title: "1. LPWAN",
      id: 1,
      items: [
        {
          title: "1. LPWAN",
          step: 1,
        },
      ],
    },
    {
      title: "2. LoRaWAN",
      id: 2,
      items: [
        {
          title: "2. LoRaWAN",
          step: 1,
        },
      ],
    },
    {
      title: "3. Architektúra LoRaWAN",
      id: 3,
      items: [
        {
          title: "3. Architektúra LoRaWAN",
          step: 1,
        }
      ],
    },
    {
      title: "4. NB-IoT: špecifikácie a výhody",
      id: 4,
      items: [
        {
          title: "4. NB-IoT: špecifikácie a výhody",
          step: 1,
        },
      ],
    },
    {
      title: "5. NB-IoT: aplikácie",
      id: 5,
      items: [
        {
          title: "5. NB-IoT: aplikácie",
          step: 1,
        },
      ],
    },
    {
      title: "6. Porovnanie technológií LPWAN",
      id: 6,
      items: [
        {
          title: "6. Porovnanie technológií LPWAN",
          step: 1,
        },
      ],
    },
  ];

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
<div className="pb-4 flex text-center flex-row">
  {topics.map((topic) => (
    <div key={topic.title}>
      {topic.items.map((item) => (
        <div key={item.title}>
          {item.title.startsWith("Test") && session && session.user.topicsCompleted + 1 < topic.id ? (
            <span
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-[300px] justify-start my-[3px] mx-[8px] border hover:border-blue-500 hover:border-solid hover:border-1 text-red-500 cursor-not-allowed"
              )}
            >
            </span>
          ) : (
            <div className="flex flex-row">
              <Link href={`/topics/${topic.id}`}>
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "px-10 justify-start text-center my-[3px] mx-[8px] border hover:border-blue-500 hover:border-solid hover:border-1"
                  )}
                >
                  <span className="text-muted-foreground">
                    {topic.id}
                  </span>
                </span>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  ))}
</div>


  );
  
}
