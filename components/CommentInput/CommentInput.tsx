import { getAuth } from "firebase/auth";
import { MouseEventHandler, useRef, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";
import { CommentsContext } from "../../context/CommentsContext";
import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { ReplyButton, SendButton } from "../UI/Buttons";
import { Textarea } from "../UI/Input";
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
  groupId?: string;
  handleButtonClick?: () => void;
}): JSX.Element {
  // Google Firebase Authentication API
  const auth = getAuth();
  const signedInUser = auth.currentUser;
  // Get username
  const username = signedInUser
    ? formatNoSpaces(signedInUser.displayName)
    : props.username;

  // Read-only/Editable state of comment from current user
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Comments Context
  const { commentsValue } = useContext(CommentsContext);
  const [allData, setAllData] = commentsValue;
  // Dyanmically display avatar of default demo user if no user logged in or logged in user's avatar if there is a user logged in
  const avatarImages = allData.users;
  const png = signedInUser
    ? signedInUser.photoURL
    : avatarImages[props.username].png;
  const webp = signedInUser
    ? signedInUser.photoURL
    : avatarImages[props.username].webp;

  /**
   * Create a new comment id and comment object body
   * @param commentContent Text input from the user
   * @returns A unique comment id and a ready to use comment object
   */
  function createComment(commentContent: string) {
    // Get timestamp
    const timestamp = getTime();
    // Create new id
    const newId = `${username}-${timestamp}`;
    // Create new Comment body
    // TODO: make displayedDate a dynamic stringified version of createdAt value
    const newCommentBody = {
      id: newId,
      content: commentContent,
      createdAt: timestamp,
      displayedDate: "1 minute ago",
      score: 0,
      username: username,
      hasReplies: false,
    };

    return { newId, newCommentBody };
  }

  /**
   * Create a new reply id and reply comment object body
   * @param replyingTo The
   * @param replyContent Text input from the user
   * @returns A unique reply id and a ready to use reply comment object
   */
  function createReply(replyingTo: string, replyContent: string) {
    // Get timestamp
    const timestamp = getTime();
    // Create new id
    const newId = `${username}-${timestamp}`;
    // Create new reply body
    // TODO: make displayedDate a dynamic stringified version of createdAt value
    const newReplyBody = {
      id: newId,
      content: replyContent,
      createdAt: timestamp,
      displayedDate: "1 minute ago",
      score: 0,
      replyingTo: replyingTo,
      username: username,
    };

    return { newId, newReplyBody };
  }

  /**
   * Submit a new comment after clicking the Send button
   */
  const handleClickSendButton = (): void => {
    if (textareaRef.current !== null) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value;
      // Create new id and comment object
      const { newId, newCommentBody } = createComment(textVal);
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

  /**
   * Submit a new comment reply after clicking the Reply button
   */
  const handleClickReplyButton = (): void => {
    if (
      textareaRef.current !== null &&
      props.groupId &&
      props.replyingTo &&
      props.handleButtonClick
    ) {
      // Get the value updated in the textarea
      let textVal = textareaRef.current.value;
      // Create new id and reply object
      const { newId, newReplyBody } = createReply(props.replyingTo, textVal);
      // Create deep copy of comments context state
      let updatedComments = cloneDeep(allData);
      // Access replies from context
      const groupId = props.groupId;
      // Append this to context
      // Existing comment group exists
      console.log(groupId);
      if (updatedComments.replies[groupId]) {
        updatedComments.replies[groupId][newId] = newReplyBody;
      } else {
        // No comment group exists, create one
        updatedComments.comments[groupId].hasReplies = true;
        updatedComments.replies[groupId] = {};
        updatedComments.replies[groupId][newId] = newReplyBody;
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
