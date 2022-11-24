import { Card } from "../UI/Card";
import { PrimaryButton } from "../UI/Buttons";

const REPLY_PLACEHOLDER = "Add a comment...";

export default function ReplyInput(): JSX.Element {
  function ReplyCardFooter(): JSX.Element {
    return (
      <div className={`flex sm:hidden flex-row justify-between items-center`}>
        <div>Avatar</div>
        <PrimaryButton label={"Send"} />
      </div>
    );
  }

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="hidden sm:block">Avatar</div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={3}
          placeholder={REPLY_PLACEHOLDER}
          className={`w-full text-darkBlue px-4 py-2 rounded-lg border-2 border-lightGray focus:outline-none focus:border-transparent focus:ring-darkBlue focus:ring-1`}
        ></textarea>
        <div className="hidden sm:block">
          <PrimaryButton label={"Send"} />
        </div>

        <ReplyCardFooter />
      </div>
    </Card>
  );
}
