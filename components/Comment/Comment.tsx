import { useContext, useState, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import { CommentsContext } from "../../context/CommentsContext";
import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { Reply, Edit, Delete, UpdateButton } from "../UI/Buttons";
import { Badge } from "../Badge";
import { Score } from "../Score";
import { Textarea } from "../UI/Input";
import { CommentInput } from "../CommentInput";
import { formatNoSpaces } from "../../utils";
import { CommentProps } from "./CommentInterface";

export default function Comment(props: CommentProps): JSX.Element {
  // Determine if the author of the current comment is the current user logged in
  const isCurrentUser = formatNoSpaces(props.currentUser) === props.username;

  // Comments state and Delete comment modal state
  const { allDataValue, modalValue, commentToDeleteValue } =
    useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  const [showModal, handleModalToggle] = modalValue;
  const [commentToDelete, setCommentToDelete] = commentToDeleteValue;

  // Read-only/Editable state of comment from current user
  const [readOnly, setReadOnly] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Toggle for displaying a new reply input under comment
  const [showReplyInput, setshowReplyInput] = useState(false);

  /**
   * Toggle between a read-only view and edit-view of a comment written by the current user.
   * Note: this only applies to comments written by the current user.
   */
  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  /**
   * Toggle the editable textarea reply under a read-only comment.
   */
  const handleReplyButtonToggle = () => {
    setshowReplyInput(!showReplyInput);
  };

  /**
   * Hide the editable textarea reply under a read-only comment.
   */
  const handleHideReplyInput = () => {
    setshowReplyInput(false);
  };

  /**
   * Submit an update to a comment written by the current user.
   * Note: this only applies to comments written by the current user.
   */
  const handleUpdateComment = () => {
    // Update the read-only comment value with the new value updated in the textarea
    if (textareaRef.current !== null) {
      let textVal = textareaRef.current.value;

      // Create deep copy of the comments context state
      let updatedComments = cloneDeep(allData);

      // Determine if this is a parent comment or reply
      const isParent = props.groupId === props.commentId;
      // Update comment content value
      if (isParent) {
        updatedComments.comments[props.groupId].content = textVal;
      } else {
        updatedComments.replies[props.groupId][props.commentId].content =
          textVal;
      }

      // Update context state
      setAllData(updatedComments);
    }
    // Change the comment card from edit-view to read-only
    toggleReadOnly();
  };

  /**
   * Show the Delete Modal and update context with the current comment's groupId and commentId
   */
  const handleClickDeleteButton = () => {
    // Show Delete Modal
    handleModalToggle();

    // Pass the current comment's groupId and commentId to context state
    const newCommentToDelete = {
      groupId: props.groupId,
      commentId: props.commentId,
    };
    setCommentToDelete(newCommentToDelete);
  };

  function CardHeader(): JSX.Element {
    return (
      <div className="flex flex-row flex-wrap items-center gap-4">
        <div>
          <Avatar pngSrc={props.avatarPng} webpSrc={props.avatarWebp} />
        </div>
        <h1 className="font-medium text-darkBlue">{props.username}</h1>
        {isCurrentUser && <Badge />}
        <div>{props.displayedDate}</div>
      </div>
    );
  }

  function CardActions(): JSX.Element {
    return (
      <>
        {isCurrentUser ? (
          <div className="flex flex-row gap-4">
            <Delete handleClick={handleClickDeleteButton} />
            <Edit handleClick={toggleReadOnly} readOnly={readOnly} />
          </div>
        ) : (
          <Reply handleClick={handleReplyButtonToggle} />
        )}
      </>
    );
  }

  function CardFooterMobile(): JSX.Element {
    return (
      <div className="sm:hidden flex flex-row justify-between">
        <Score
          initialScore={props.score}
          groupId={props.groupId}
          commentId={props.commentId}
        />
        <CardActions />
      </div>
    );
  }

  function ReplyingTo(props: { username: string }): JSX.Element {
    return (
      <div className="inline-block font-medium text-moderateBlue mr-1">
        @{props.username}
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className="h-full flex flex-col sm:flex-row justify-between sm:justify-start sm:gap-4 text-grayishBlue">
          <div className="hidden sm:block">
            <Score
              initialScore={props.score}
              groupId={props.groupId}
              commentId={props.commentId}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <CardHeader />
              <div className="hidden sm:block">
                <CardActions />
              </div>
            </div>

            <div id="comment">
              {isCurrentUser && !readOnly ? (
                <div className="flex flex-col gap-4">
                  <Textarea content={props.content} textareaRef={textareaRef} />
                  <div className="flex justify-end">
                    <UpdateButton handleClick={handleUpdateComment} />
                  </div>
                </div>
              ) : (
                <>
                  {props.replyingTo && (
                    <ReplyingTo username={props.replyingTo} />
                  )}
                  {props.content}
                </>
              )}
            </div>

            <CardFooterMobile />
          </div>
        </div>
      </Card>
      {showReplyInput && (
        <CommentInput
          username={props.currentUser}
          replyingTo={props.username}
          groupId={props.groupId}
          isReply={true}
          handleButtonClick={handleHideReplyInput}
        />
      )}
    </>
  );
}
