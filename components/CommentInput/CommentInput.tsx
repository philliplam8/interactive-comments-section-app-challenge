import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { ReplyButton, SendButton } from "../UI/Buttons";
import { Textarea } from "../UI/Input";

const REPLY_PLACEHOLDER = "Add a comment...";

export interface RawCommentInput {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface CommentInputProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
}

export default function CommentInput(props: {
  rawData: RawCommentInput;
  isReply: boolean;
}): JSX.Element {
  const avatarPng = props.rawData.image.png;
  const avatarWebp = props.rawData.image.webp;

  function ReplyCardFooter(): JSX.Element {
    return (
      <div className={`flex sm:hidden flex-row justify-between items-center`}>
        <Avatar pngSrc={avatarPng} webpSrc={avatarWebp} />
        {props.isReply ? <ReplyButton /> : <SendButton />}
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
            {props.isReply ? <ReplyButton /> : <SendButton />}
          </div>

          <ReplyCardFooter />
        </div>
      </Card>
    </div>
  );
}
