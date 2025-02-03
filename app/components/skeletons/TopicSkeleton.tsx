import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";

const TopicSkeleton = () => {
    return (
      <div className="flex flex-col mx-auto mt-3 min-h-screen space-y-4"> 
        <SkeletonTheme baseColor="#c4c4c4" highlightColor="#f5f5f5">
          <Skeleton height={50} width={900} /> 
          <Skeleton height={30} width={900} /> 
          <Skeleton height={700} width={900} /> 
        </SkeletonTheme>
      </div>
    );
  };
  
  
  export default TopicSkeleton;