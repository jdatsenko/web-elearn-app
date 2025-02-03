import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageSkeleton = () => {
  return (
    <>
      <div className="mx-auto flex flex-col items-center space-y-2 justify-center">
        <SkeletonTheme baseColor="#c4c4c4" highlightColor="#f5f5f5">
          <div className="p-4 flex flex-col space-y-4 items-center">
            <Skeleton height={50} width={700} />
            <Skeleton height={50} width={100} />
          </div>
          <div className="flex flex-row gap-10">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md mb-4">
                <SkeletonTheme baseColor="#c4c4c4" highlightColor="#f5f5f5">
                  <Skeleton height={250} width={330} />
                </SkeletonTheme>
              </div>
            ))}
          </div>
        </SkeletonTheme>
      </div>
    </>
  );
};

export default HomePageSkeleton;
