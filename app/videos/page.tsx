"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const videoUrls = [
  "https://www.youtube.com/embed/AYsrtudQdGE?start=2",
  "https://www.youtube.com/embed/ZsVhYiX4_6o?start=2",
  "https://www.youtube.com/embed/F2YTUwh5-qE?start=2",
  "https://www.youtube.com/embed/RlZ9rXbrJqM?start=2",
];

const VideoItem = ({
  src,
  onDelete,
  isTeacher,
}: {
  src: string;
  onDelete?: () => void;
  isTeacher?: boolean;
}) => (
  <CarouselItem>
    <div className="p-1">
      <Card>
        <CardContent className="p-2 relative">
          {isTeacher && onDelete && (
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2 z-10"
              onClick={onDelete}
            >
              Vymazať
            </Button>
          )}
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  </CarouselItem>
);

const Videos = () => {
  const { data: session } = useSession() as {
    data: any;
  };
  const isTeacher =
    session?.user?.role === "TEACHER" || session?.user?.role === "ADMIN";
  const { toast } = useToast();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  const [newUrl, setNewUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteVideo = async (urlToDelete: string) => {
    try {
      const res = await fetch("/api/videos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToDelete }),
      });

      if (!res.ok) throw new Error("Chyba pri mazaní");

      setVideoUrls((prev) => prev.filter((url) => url !== urlToDelete));
      toast({ title: "Video zmazané" });
    } catch {
      toast({
        title: "Chyba",
        description: "Nepodarilo sa vymazať video.",
        variant: "destructive",
      });
    }
  };

  const handleAddVideo = async () => {
    const extractVideoId = (url: string): string | null => {
      try {
        const parsed = new URL(url);
        if (parsed.hostname === "youtu.be") {
          return parsed.pathname.slice(1);
        }
        if (parsed.hostname.includes("youtube.com")) {
          return parsed.searchParams.get("v");
        }
        return null;
      } catch {
        return null;
      }
    };

    const videoId = extractVideoId(newUrl);
    if (!videoId) {
      toast({
        title: "Neplatný odkaz",
        description: "Zadajte platný YouTube odkaz.",
        variant: "destructive",
      });
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: embedUrl }),
      });

      if (!res.ok) throw new Error("Nepodarilo sa uložiť video");

      setVideoUrls((prev) => [...prev, embedUrl]);
      setNewUrl("");
      setDialogOpen(false);

      toast({
        title: "Video pridané",
        description: "Video bolo úspešne pridané.",
      });
    } catch (err) {
      toast({
        title: "Chyba",
        description: "Nepodarilo sa uložiť video.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideoUrls(data);
    };
    fetchVideos();
  }, []);

  return (
    <>
      {isTeacher && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="m-4">Pridať video</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Pridať YouTube odkaz</DialogTitle>
            <Input
              placeholder="https://www.youtube.com/..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <DialogFooter>
              <Button onClick={handleAddVideo}>Potvrdiť</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div className="flex justify-center mt-10 w-full">
        <Carousel className="max-w-2xl my-10 md:w-full w-80">
          <CarouselContent>
            {videoUrls.map((url, index) => (
              <VideoItem
                key={index}
                src={url}
                isTeacher={isTeacher}
                onDelete={() => handleDeleteVideo(url)}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Videos;
