import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageSkeleton = () => {
    return (
        <div className="flex flex-row gap-10 items-center justify-center min-h-screen"> 
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-md mb-4"> 
              <SkeletonTheme baseColor="#c4c4c4" highlightColor="#f5f5f5">
                <Skeleton height={200} width={300}/> 
              </SkeletonTheme>
            </div>
          ))}
        </div>
      );
  };
  
  export default HomePageSkeleton;