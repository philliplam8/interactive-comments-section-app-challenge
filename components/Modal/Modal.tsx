import { Card } from "../UI/Card";
import { SecondaryButton, ErrorButton } from "../UI/Buttons";

const TEXT = {
  DELETE_CONFIRMATION:
    "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
  BTN_NO: "NO, CANCEL",
  BTN_YES: "YES, DELETE",
};

export default function Modal(): JSX.Element {
  return (
    <Card>
      <div className="flex flex-col gap-4 p-2">
        <h1 className="text-xl sm:text-2xl text-darkBlue font-medium ">
          Delete comment
        </h1>
        <p className="text-grayishBlue">{TEXT.DELETE_CONFIRMATION}</p>
        <div className="flex flex-row gap-3 justify-start min-[375px]:justify-between">
          <SecondaryButton label={TEXT.BTN_NO} />
          <ErrorButton label={TEXT.BTN_YES} />
        </div>
      </div>
    </Card>
  );
}
