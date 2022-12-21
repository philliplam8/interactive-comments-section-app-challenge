import Skeleton from "./Skeleton";

export default function SkeletonGroup(): JSX.Element {
  return (
    <div className="w-[1180px] flex flex-col gap-4">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
