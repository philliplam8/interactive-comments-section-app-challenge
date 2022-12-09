import { MouseEventHandler } from "react";
import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { ReplyButton, SendButton } from "../UI/Buttons";
import { Textarea } from "../UI/Input";
import { useCommentsData } from "../../hooks/useCommentsData";

export interface CommentInputProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
}

export default function CommentInput(props: {
  username: string;
  isReply: boolean;
  handleButtonClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const { data } = useCommentsData();
  const avatarImages = JSON.parse(data.toString()).users;
  const { png, webp } = avatarImages[props.username];

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
        <Avatar pngSrc={png} webpSrc={webp} />
        <DynamicButton />
      </div>
    );
  }

  return (
    <div className="-mt-3">
      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="hidden sm:block">
            <Avatar pngSrc={png} webpSrc={webp} large={true} />
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
