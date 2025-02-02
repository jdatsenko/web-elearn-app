import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopBarSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="p-4 flex flex-col sm:flex-row w-full justify-between border-b h-fit">
        <div className="flex flex-grow justify-between">
          <div className="flex gap-3 self-start">
            <Skeleton width={70} height={35} />
            <Skeleton width={70} height={35} />
          </div>
          <div className="flex gap-3 self-end">
            <Skeleton width={100} height={35} />
            <Skeleton width={100} height={35} />
          </div>
        </div>
        <div className="flex items-center justify-center ml-4 mt-4 sm:mt-0">
          <Skeleton circle width={35} height={35} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TopBarSkeleton;
