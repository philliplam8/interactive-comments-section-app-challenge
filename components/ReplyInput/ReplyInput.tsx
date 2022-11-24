import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { PrimaryButton } from "../UI/Buttons";

const REPLY_PLACEHOLDER = "Add a comment...";
const avatarPng = "/images/avatars/image-amyrobson.png";
const avatarWebp = "/images/avatars/image-amyrobson.webp";

export default function ReplyInput(): JSX.Element {
  function ReplyCardFooter(): JSX.Element {
    return (
      <div className={`flex sm:hidden flex-row justify-between items-center`}>
        <Avatar pngSrc={avatarPng} webpSrc={avatarWebp} />
        <PrimaryButton label={"Send"} />
      </div>
    );
  }

  return (
    <div className="-mt-3">
      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="hidden sm:block">
            <Avatar pngSrc={avatarPng} webpSrc={avatarWebp} large={true} />
          </div>
          <textarea
            name=""
            id=""
            cols={25}
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
    </div>
  );
}
