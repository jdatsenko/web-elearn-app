import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const TopicSkeleton = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex flex-col mx-4 md:w-5/6 lg:w-1/2 md:mx-auto md:mt-12 min-h-screen space-y-4">
      <SkeletonTheme
        baseColor={isDark ? "#2a2a2a" : "#bdbdbd"}
        highlightColor={isDark ? "#444" : "#e0e0e0"}
      >
        <Skeleton className="md:h-[3rem] h-[7rem]" />
        <Skeleton className="md:h-[2rem] h-[3rem]" />
        <Skeleton className="h-[200rem]" />
      </SkeletonTheme>
    </div>
  );
};

export default TopicSkeleton;
