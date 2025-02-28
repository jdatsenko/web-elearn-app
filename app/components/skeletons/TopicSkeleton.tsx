import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const TopicSkeleton = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex flex-col mx-auto mt-3 w-2/3 min-h-screen space-y-4">
      <SkeletonTheme
        baseColor={isDark ? "#2a2a2a" : "#bdbdbd"}
        highlightColor={isDark ? "#444" : "#e0e0e0"}
      >
        <Skeleton height={50} />
        <Skeleton height={30} />
        <Skeleton className="h-[200rem]" />
      </SkeletonTheme>
    </div>
  );
};

export default TopicSkeleton;
