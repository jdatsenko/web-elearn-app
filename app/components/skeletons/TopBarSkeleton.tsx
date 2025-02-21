import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const TopBarSkeleton = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <SkeletonTheme baseColor={isDark ? "#2a2a2a" : "#e0e0e0"}
        highlightColor={isDark ? "#444" : "#f5f5f5"}>
      <div className="p-4 flex flex-col sm:flex-row w-full justify-between border-b h-fit">
        <div className="flex flex-grow justify-between">
          <div className="flex gap-3 self-start">
            <Skeleton width={75} height={35} />
          </div>
          <div className="flex gap-3 self-end">
            <Skeleton width={100} height={35} />
          </div>
        </div>
        <div className="flex items-center justify-center ml-4 mt-4 sm:mt-0">
          <Skeleton circle width={35} height={35} />
        </div>
      </div>

      <style>{`
        span.react-loading-skeleton:before {
            content: "" !important;
        }
        span {
            height: 2.3rem;
        }
    `}</style>
    </SkeletonTheme>
  );
};

export default TopBarSkeleton;
