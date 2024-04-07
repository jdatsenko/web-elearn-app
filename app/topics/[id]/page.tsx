"use client";
import Topic1 from "@/app/components/topics/Topic1"
import Topic2 from "@/app/components/topics/Topic2"
import Topic3 from "@/app/components/topics/Topic3"
import Topic4 from "@/app/components/topics/Topic4"
import Topic5 from "@/app/components/topics/Topic5"
import Topic6 from "@/app/components/topics/Topic6"
import { useSession } from "next-auth/react"

export default function Topic({ params }: { params: { id: string } }) {
    const { data: session } = useSession();
    if (!session) {
      return <div>Unauthorized</div>;
    }
    return (
        <div className="h-full overflow-y-auto">
            {/* <h1>Topic {params.id}</h1> */}
            {params.id === '1' && <Topic1 />}
            {params.id === '2' && <Topic2 />}
            {params.id === '3' && <Topic3 />}
            {params.id === '4' && <Topic4 />}
            {params.id === '5' && <Topic5 />}
            {params.id === '6' && <Topic6 />}
        </div>
    )
  }