import { Card } from "../UI/Card";

function SkeletonRow(props: { extraClass?: string }): JSX.Element {
  return (
    <div
      className={`h-3 bg-lightGrayishBlue rounded-md ${props.extraClass}`}
    ></div>
  );
}

export default function Skeleton(): JSX.Element {
  return (
    <Card>
      <div className="h-[120px] animate-pulse flex flex-row gap-4">
        <div className="flex-1 space-y-10">
          <SkeletonRow extraClass="relative top-2" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <SkeletonRow extraClass="col-span-1" />
              <SkeletonRow extraClass="col-span-2" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <SkeletonRow extraClass="col-span-2" />
              <SkeletonRow extraClass="col-span-1" />
            </div>
            <SkeletonRow />
          </div>
        </div>
      </div>
    </Card>
  );
}
