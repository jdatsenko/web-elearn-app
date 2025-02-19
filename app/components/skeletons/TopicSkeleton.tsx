import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const TopicSkeleton = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
      <div className="flex flex-col mx-auto mt-3 w-2/3 min-h-screen space-y-4">
        <SkeletonTheme baseColor={isDark ? "#2a2a2a" : "#e0e0e0"}
        highlightColor={isDark ? "#444" : "#f5f5f5"}>
          <Skeleton height={50} /> 
          <Skeleton height={30} /> 
          <Skeleton height={700} /> 
        </SkeletonTheme>
      </div>
    );
  };
  
  
  export default TopicSkeleton;