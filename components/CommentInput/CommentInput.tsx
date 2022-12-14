import { getAuth } from "firebase/auth";
import { MouseEventHandler, useRef } from "react";
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
  // Read-only/Editable state of comment from current user
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Google Firebase Authentication API
  const auth = getAuth();
  const signedInUser = auth.currentUser;

  // React Query
  const { data } = useCommentsData();
  const avatarImages = JSON.parse(data.toString()).users;
  // const { png, webp } = avatarImages[props.username];

  // Dyanmically display avatar of default demo user if no user logged in or logged in user's avatar if there is a user logged in
  const png = signedInUser
    ? signedInUser.photoURL
    : avatarImages[props.username].png;
  const webp = signedInUser
    ? signedInUser.photoURL
    : avatarImages[props.username].webp;

  const handleClickSendButton = (): void => {
    // Get the value updated in the textarea
    if (textareaRef.current !== null) {
      let textVal = textareaRef.current.value;
      console.log("Comment Input: ", textVal);
      // TODO Create new Comment body
      // TODO Append this to context

      // Clear textarea
      textareaRef.current.value = "";
    }
  };

  function DynamicButton(): JSX.Element {
    return (
      <>
        {props.isReply ? (
          <ReplyButton handleClick={props.handleButtonClick} />
        ) : (
          <SendButton handleClick={handleClickSendButton} />
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
          <Textarea textareaRef={textareaRef} />
          <div className="hidden sm:block">
            <DynamicButton />
          </div>

          <ReplyCardFooter />
        </div>
      </Card>
    </div>
  );
}
