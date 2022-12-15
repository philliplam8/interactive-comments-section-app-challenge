import { getAuth } from "firebase/auth";
import { MouseEventHandler, useRef, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";
import { CommentsContext } from "../../context/CommentsContext";
import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { ReplyButton, SendButton } from "../UI/Buttons";
import { Textarea } from "../UI/Input";
import { useCommentsData } from "../../hooks/useCommentsData";
import { formatNoSpaces, getTime } from "../../utils";

export interface CommentInputProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
}

export default function CommentInput(props: {
  username: string;
  isReply: boolean;
  replyingTo?: string;
  parentCommentId?: string;
  handleButtonClick?: () => void;
}): JSX.Element {
  // Comments Context
  const { commentsValue, currentUserValue } = useContext(CommentsContext);
  const [allData, setAllData] = commentsValue;
  const [currentUser, setCurrentUser] = currentUserValue;

  // Read-only/Editable state of comment from current user
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Google Firebase Authentication API
  const auth = getAuth();
  const signedInUser = auth.currentUser;

  // React Query
  const { data } = useCommentsData();
  const avatarImages = JSON.parse(data.toString()).users;

  // Dyanmically display avatar of default demo user if no user logged in or logged in user's avatar if there is a user logged in
  const png = signedInUser
    ? signedInUser.photoURL
    : avatarImages[props.username].png;
  const webp = signedInUser
    ? signedInUser.photoURL
    : avatarImages[props.username].webp;

  const handleClickSendButton = (): void => {
    if (textareaRef.current !== null) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value;
      // Get username
      const username = signedInUser
        ? formatNoSpaces(signedInUser.displayName)
        : props.username;
      // Create new id
      const newId = `${username}-${getTime()}`;
      // Create new Comment body
      const newCommentBody = {
        id: newId,
        content: textVal,
        createdAt: "1 minute ago",
        displayedDate: "1 minute ago",
        score: 0,
        username: username,
        hasReplies: false,
      };

      // Create deep copy of comments context state
      let updatedComments = cloneDeep(allData);

      // Append this to context
      updatedComments.comments[newId] = newCommentBody;

      // Update context
      setAllData(updatedComments);

      // Clear textarea
      textareaRef.current.value = "";
    }
  };

  const handleClickReplyButton = (): void => {
    if (
      textareaRef.current !== null &&
      props.parentCommentId &&
      props.handleButtonClick
    ) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value;
      // Get username
      const username = signedInUser
        ? formatNoSpaces(signedInUser.displayName)
        : props.username;
      // Create new id
      const newId = `${username}-${getTime()}`;
      // Create new reply body
      const newReplyBody = {
        id: newId,
        content: textVal,
        createdAt: "1 minute ago",
        displayedDate: "1 minute ago",
        score: 0,
        replyingTo: props.replyingTo,
        username: username,
      };
      // Create deep copy of comments context state
      let updatedComments = cloneDeep(allData);
      // Access replies from context
      const parentId = props.parentCommentId;
      // Append this to context
      console.log(parentId);
      if (updatedComments.replies[parentId]) {
        updatedComments.replies[parentId][newId] = newReplyBody;
      } else {
        // TODO HUH???????
        updatedComments.comments[parentId].hasReplies = true;
        updatedComments.replies[parentId] = {};
        updatedComments.replies[parentId][newId] = newReplyBody;
      }

      // Update context
      setAllData(updatedComments);
      // Hide Input Field
      props.handleButtonClick();
      // Clear textarea
      textareaRef.current.value = "";
    }
  };

  function DynamicButton(): JSX.Element {
    return (
      <>
        {props.isReply ? (
          <ReplyButton handleClick={handleClickReplyButton} />
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
