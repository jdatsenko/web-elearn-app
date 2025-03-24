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

const videoUrls = [
  "https://www.youtube.com/embed/AYsrtudQdGE?start=2",
  "https://www.youtube.com/embed/ZsVhYiX4_6o?start=2",
  "https://www.youtube.com/embed/F2YTUwh5-qE?start=2",
  "https://www.youtube.com/embed/RlZ9rXbrJqM?start=2",
];

const VideoItem = ({ src }: { src: string }) => (
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className="p-2">
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
  return (
    <div className="flex justify-center mt-10 w-full">
      <Carousel className="max-w-2xl my-10 md:w-full size">
        <CarouselContent>
          {videoUrls.map((url, index) => (
            <VideoItem key={index} src={url} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <style>{`
        .size {
            width: 70%;
        }
    `}</style>
    </div>
  );
};

export default Videos;
