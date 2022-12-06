import { useContext, useState } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { Reply, Edit, Delete, UpdateButton } from "../UI/Buttons";
import { Badge } from "../Badge";
import { Score } from "../Score";
import { Textarea } from "../UI/Input";
import { CardHeaderProps, CommentProps } from "./CommentInterface";
import { CommentInput } from "../CommentInput";

export default function Comment(props: CommentProps): JSX.Element {
  // Determine if the author of the current comment is the current user logged in
  const isCurrentUser = props.currentUser.username === props.username;

  // Read-only/Editable state of comment from current user
  const [readOnly, setReadOnly] = useState(true);

  // Delete comment modal state
  const { modalValue } = useContext(CommentsContext);
  const [showModal, handleModalToggle] = modalValue;

  // Display new reply input under comment
  const [showReplyInput, setshowReplyInput] = useState(false);

  /**
   * Toggle between a read-only view and edit-view of a comment written by the current user.
   * Note: this only applies to comments written by the current user.
   */
  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  /**
   * Submit an update to a comment written by the current user.
   * Note: this only applies to comments written by the current user.
   */
  const handleUpdateComment = () => {
    toggleReadOnly();
  };

  /**
   * Display an editable textarea reply under a read-only comment.
   */
  const handleReplyButtonToggle = () => {
    setshowReplyInput(!showReplyInput);
  };

  /**
   * Submit a comment reply
   */
  const handleReplyButtonSubmit = () => {
    setshowReplyInput(false);
  };

  function CardHeader(props: CardHeaderProps): JSX.Element {
    return (
      <div className="flex flex-row flex-wrap items-center gap-4">
        <div>
          <Avatar pngSrc={props.avatarPng} webpSrc={props.avatarWebp} />
        </div>
        <h1 className="font-medium text-darkBlue">{props.username}</h1>
        {isCurrentUser && <Badge />}
        <div>{props.createdAt}</div>
      </div>
    );
  }

  function CardActions(): JSX.Element {
    return (
      <>
        {isCurrentUser ? (
          <div className="flex flex-row gap-4">
            <Delete handleClick={handleModalToggle} />
            <Edit handleClick={toggleReadOnly} readOnly={readOnly} />
          </div>
        ) : (
          <Reply handleClick={handleReplyButtonToggle} />
        )}
      </>
    );
  }

  function CardFooterMobile(props: { score: number }): JSX.Element {
    return (
      <div className="sm:hidden flex flex-row justify-between">
        <Score initialScore={props.score} />
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
            <Score initialScore={props.score} />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <CardHeader
                avatarPng={props.avatarPng}
                avatarWebp={props.avatarWebp}
                username={props.username}
                createdAt={props.createdAt}
                currentUser={props.currentUser}
              />
              <div className="hidden sm:block">
                <CardActions />
              </div>
            </div>

            <div id="comment">
              {isCurrentUser && !readOnly ? (
                <div className="flex flex-col gap-4">
                  <Textarea content={props.content} />
                  <div className="flex justify-end">
                    <UpdateButton handleClick={handleUpdateComment} />
                  </div>
                </div>
              ) : (
                <>
                  {props.replyingTo && (
                    <ReplyingTo username={props.replyingTo} />
                  )}
                  <div className="inline">{props.content}</div>
                </>
              )}
            </div>

            <CardFooterMobile score={props.score} />
          </div>
        </div>
      </Card>
      {showReplyInput && (
        <CommentInput
          rawData={props.currentUser}
          isReply={true}
          handleButtonClick={handleReplyButtonSubmit}
        />
      )}
    </>
  );
}
