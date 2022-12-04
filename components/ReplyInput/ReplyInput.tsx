import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { PrimaryButton } from "../UI/Buttons";
import { Textarea } from "../UI/Input";

export interface RawReplyInput {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

export interface ReplyInputProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
}

const REPLY_PLACEHOLDER = "Add a comment...";

export default function ReplyInput(props: {
  rawData: RawReplyInput;
}): JSX.Element {
  const avatarPng = props.rawData.currentUser.image.png;
  const avatarWebp = props.rawData.currentUser.image.webp;

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
          <Textarea />
          <div className="hidden sm:block">
            <PrimaryButton label={"Send"} />
          </div>

          <ReplyCardFooter />
        </div>
      </Card>
    </div>
  );
}
