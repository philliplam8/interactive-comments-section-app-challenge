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
import { formatNoSpaces, stringOnlySpaces } from "../../utils";
import { CommentProps } from "./CommentInterface";
import { getTime, stringifyTime } from "../../utils/helpers";
import { Popover } from "../UI/Popover";

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

  // Error Message Display State
  const [showError, setShowError] = useState(false);

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
      if (stringOnlySpaces(textVal)) {
        setShowError(true);
      } else {
        // Create deep copy of the comments context state
        let updatedComments = cloneDeep(allData);

        // Determine if this is a parent comment or reply
        const isParent = props.groupId === props.commentId;
        // Update comment content value (and timestamp if content changed)
        if (isParent) {
          updatedComments.comments[props.groupId].content = textVal;
          if (allData.comments[props.groupId].content !== textVal) {
            updatedComments.comments[props.groupId].editedAt = getTime();
          }
        } else {
          updatedComments.replies[props.groupId][props.commentId].content =
            textVal;
          if (
            allData.replies[props.groupId][props.commentId].content !== textVal
          ) {
            updatedComments.replies[props.groupId][props.commentId].editedAt =
              getTime();
          }
        }

        // Show Reset Button
        updatedComments.showReset = true;
        // Update context state
        setAllData(updatedComments);
        // Remove error message
        setShowError(false);
        // Change the comment card from edit-view to read-only
        toggleReadOnly();
      }
    }
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
    let displayedDate = props.createdAt;
    const isEdited = props.createdAt !== props.editedAt;
    // Check if comment has been edited
    if (isEdited) {
      displayedDate = props.editedAt;
    }
    const formattedDate = stringifyTime(displayedDate);
    const formattedCreatedAt = stringifyTime(props.createdAt);

    return (
      <div className="flex flex-row flex-wrap items-center gap-4">
        <div>
          <Avatar pngSrc={props.avatarPng} webpSrc={props.avatarWebp} />
        </div>
        <h1 className="font-medium text-darkBlue dark:text-white">
          {props.username}
        </h1>

        {isCurrentUser && <Badge />}

        <Popover
          position="top"
          hide={!isEdited}
          label={`Edited ${formattedDate}. \nCreated ${formattedCreatedAt}.`}
        >
          <div className={`flex flex-row items-center justify-start gap-0}`}>
            <p>{stringifyTime(displayedDate)}</p>
            {isEdited ? <p>*</p> : <></>}
          </div>
        </Popover>
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

  function ScoreContainer(): JSX.Element {
    return (
      <Score
        initialScore={props.score}
        groupId={props.groupId}
        commentId={props.commentId}
        currentUser={props.currentUser}
      />
    );
  }

  function CardFooterMobile(): JSX.Element {
    return (
      <div className="sm:hidden flex flex-row justify-between">
        <ScoreContainer />
        <CardActions />
      </div>
    );
  }

  function ReplyingTo(props: { username: string }): JSX.Element {
    return (
      <div className="inline-block font-medium text-moderateBlue dark:text-darkModeModerateBlue mr-1">
        @{props.username}
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className="h-full flex flex-col sm:flex-row justify-between sm:justify-start sm:gap-4">
          <div className="hidden sm:block">
            <ScoreContainer />
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
                  <Textarea
                    content={props.content}
                    textareaRef={textareaRef}
                    showError={showError}
                    currentUser={true}
                  />
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
          isReply={true}
          replyingTo={props.username}
          groupId={props.groupId}
          handleButtonClick={handleHideReplyInput}
        />
      )}
    </>
  );
}
