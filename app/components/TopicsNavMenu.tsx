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
          title: "1.1 Technológia LPWAN",
          step: 1,
        },
        {
          title: "1.2 Typy technológie LPWAN",
          step: 2,
        },
        {
          title: "1.3 Aplikácie technológií LPWAN",
          step: 3,
        },
        {
          title: "Test 1",
          step: 4,
        },
      ],
    },
    {
      title: "2. LoRaWAN",
      id: 2,
      items: [
        {
          title: "2.1 LoRa Alliance",
          step: 1,
        },
        {
          title: "2.2 Obmedzenia a výhody LoRaWAN",
          step: 2,
        },
        {
          title: "Test 2",
          step: 3,
        },
      ],
    },
    {
      title: "3. Architektúra LoRaWAN",
      id: 3,
      items: [
        {
          title: "3.1 Ako funguje architektúra LoRaWAN",
          step: 1,
        },
        {
          title: "3.2 Koncové zariadenia",
          step: 2,
        },
        {
          title: "3.3 Brány",
          step: 3,
        },
        {
          title: "3.4 Servery",
          step: 4,
        },
        {
          title: "Test 3",
          step: 5,
        },
      ],
    },
    {
      title: "4. NB-IoT: špecifikácie a výhody",
      id: 4,
      items: [
        {
          title: "4.1 NB-IoT a jeho špecifikácie",
          step: 1,
        },
        {
          title: "4.2 Výhody NB-IoT",
          step: 2,
        },
        {
          title: "Test 4",
          step: 3,
        },
      ],
    },
    {
      title: "5. NB-IoT: aplikácie",
      id: 5,
      items: [
        {
          title: "5.1 Smart meters",
          step: 1,
        },
        {
          title: "5.2 Smart cities",
          step: 2,
        },
        {
          title: "5.3 Smart Buildings",
          step: 3,
        },
        {
          title: "Test 5",
          step: 4,
        },
      ],
    },
    {
      title: "6. Porovnanie technológií LPWAN",
      id: 6,
      items: [
        {
          title: "6.1 Sigfox vs LoRa vs NB-IoT",
          step: 1,
        },
        {
          title: "Test 6",
          step: 2,
        },
      ],
    },
  ];

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="pb-4 min-h-[40.5rem] max-h-[40.5rem] overflow-y-scroll">
      {topics.map((topic) => (
        <div key={topic.title}>
          <h5 className="title m-[20px]">{topic.title}</h5>
          {topic.items.map((item) => (
            <div key={item.title}>
              {item.title.startsWith("Test") && session && session.user.topicsCompleted + 1 < topic.id ? (
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-[300px] justify-start my-[3px] mx-[8px] border hover:border-blue-500 hover:border-solid hover:border-1 text-red-500 cursor-not-allowed"
                  )}
                >
                  <span className="text-left text-muted-foreground">
                    {item.title}
                  </span>
                </span>
              ) : (
                <Link href={`/topics/${topic.id}?step=${item.step}`}>
                  <span
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-[300px] justify-start my-[3px] mx-[8px] border hover:border-blue-500 hover:border-solid hover:border-1"
                    )}
                  >
                    <span className="text-left text-muted-foreground">
                      {item.title}
                    </span>
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
}
