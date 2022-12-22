import Skeleton from "./Skeleton";

export default function SkeletonGroup(): JSX.Element {
  return (
    <div className="md:w-[730px] flex flex-col gap-4">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
