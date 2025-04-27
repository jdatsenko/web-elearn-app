"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

interface Topic {
  topicNumber: number;
  title: string;
  description: string;
  createdById: number;
}

interface TopicCardProps {
  topic: Topic;
  index: number;
  isTeacher: boolean;
  currentUserId: number | undefined;
  onDelete: (topicNumber: number) => void; 
}

const TopicCard = ({ topic, index, isTeacher, currentUserId, onDelete }: TopicCardProps) => {
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null);

  const handleDelete = async () => {
    await onDelete(topic.topicNumber); 
    setTopicToDelete(null); 
  };

  return (
    <Card className="w-full border border-gray-400 bg-background max-w-[25rem] mx-auto">
      <CardHeader>
        <CardTitle className="leading-[1.5] break-words flex w-full justify-between">
          <span>
            {index + 1}. {topic.title}
          </span>
          {isTeacher && topic.createdById === currentUserId && (
            <Trash2Icon
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => setTopicToDelete(topic.topicNumber)}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="break-words">
          {topic.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/topics/${topic.topicNumber}`}
        >
          Pozrieť
        </Link>
      </CardFooter>

      {topicToDelete === topic.topicNumber && (
        <Dialog open={true} onOpenChange={(open) => !open && setTopicToDelete(null)}>
          <DialogContent className="max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Potvrdenie vymazania</DialogTitle>
              <DialogDescription>
                Naozaj chcete vymazať túto tému? Táto akcia je nezvratná.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setTopicToDelete(null)}>
                Zrušiť
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete} // Call the handleDelete function
              >
                Vymazať
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default TopicCard;
