import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const HomePageSkeleton = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const skeletonWidth = windowWidth > 1150 || windowWidth <= 770 ? 330 : 200;

  return (
    <>
      <div className="mx-auto flex flex-col items-center space-y-2 justify-center">
        <SkeletonTheme
          baseColor={isDark ? "#2a2a2a" : "#bdbdbd"}
          highlightColor={isDark ? "#444" : "#e0e0e0"}
        >
          <div className="p-4 flex flex-col space-y-4 items-center">
            <Skeleton height={50} width={700} />
            <Skeleton height={50} width={100} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="border border-gray-400 rounded-lg p-4 shadow-md mb-4">
                <SkeletonTheme
                  baseColor={isDark ? "#2a2a2a" : "#bdbdbd"}
                  highlightColor={isDark ? "#444" : "#e0e0e0"}
                >
                  <Skeleton height={250} width={skeletonWidth} />
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
