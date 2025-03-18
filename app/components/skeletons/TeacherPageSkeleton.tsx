import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const TeacherPageSkeleton = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex flex-col mt-3 min-h-screen space-y-4">
      <SkeletonTheme
        baseColor={isDark ? "#2a2a2a" : "#bdbdbd"}
        highlightColor={isDark ? "#444" : "#e0e0e0"}
      >
        <div className="md:w-2/5 w-2/3 mx-auto">  
            <Skeleton className="md:h-[3rem] h-[5rem]" />
        </div>
        <div className="md:w-2/3 mx-5 md:mx-60">
          <div className="w-[60px]">
            <Skeleton className="md:h-[1rem]" />
          </div>
          <div>
            <Skeleton className="md:h-[3.5rem] h-[4rem]" />
          </div>
        </div>
        <div className="md:w-2/3 mx-5 md:mx-60">
          <div className="w-[60px]">
            <Skeleton className="md:h-[1rem]" />
          </div>
          <div>
            <Skeleton className="md:h-[3.5rem] h-[4rem]" />
          </div>
        </div>
        <div className="mx-5 md:mx-60">
          <div className="mx-auto mt-12 mb-2 w-[8rem]">
            <Skeleton className="h-[2.5rem]" />
          </div>
          <Skeleton className="h-[50rem]" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default TeacherPageSkeleton;
