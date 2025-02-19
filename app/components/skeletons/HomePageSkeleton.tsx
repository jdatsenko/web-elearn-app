import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const HomePageSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <div className="mx-auto flex flex-col items-center space-y-2 justify-center">
        <SkeletonTheme
        baseColor={isDark ? "#2a2a2a" : "#e0e0e0"}
        highlightColor={isDark ? "#444" : "#f5f5f5"}>
          <div className="p-4 flex flex-col space-y-4 items-center">
            <Skeleton height={50} width={700} />
            <Skeleton height={50} width={100} />
          </div>
          <div className="flex flex-row gap-10">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md mb-4">
                <SkeletonTheme baseColor={isDark ? "#2a2a2a" : "#e0e0e0"} highlightColor={isDark ? "#444" : "#f5f5f5"}>
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
