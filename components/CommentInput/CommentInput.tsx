import { MouseEventHandler } from "react";
import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { ReplyButton, SendButton } from "../UI/Buttons";
import { Textarea } from "../UI/Input";

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
  handleButtonClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const avatarPng = props.rawData.image.png;
  const avatarWebp = props.rawData.image.webp;

  function DynamicButton(): JSX.Element {
    return (
      <>
        {props.isReply ? (
          <ReplyButton handleClick={props.handleButtonClick} />
        ) : (
          <SendButton handleClick={props.handleButtonClick} />
        )}
      </>
    );
  }

  function ReplyCardFooter(): JSX.Element {
    return (
      <div className={`flex sm:hidden flex-row justify-between items-center`}>
        <Avatar pngSrc={avatarPng} webpSrc={avatarWebp} />
        <DynamicButton />
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
            <DynamicButton />
          </div>

          <ReplyCardFooter />
        </div>
      </Card>
    </div>
  );
}
