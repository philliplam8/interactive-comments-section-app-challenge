import { Comment, CommentReplies, ParentCommentProps } from "./";

export default function CommentContainer(
  props: ParentCommentProps
): JSX.Element {
  const hasReplies = props.replies.length > 0;

  return (
    <>
      <Comment
        key={props.id}
        currentUser={props.currentUser}
        content={props.content}
        avatarPng={props.avatarPng}
        avatarWebp={props.avatarWebp}
        createdAt={props.createdAt}
        score={props.score}
        username={props.username}
      />
      {hasReplies && (
        <CommentReplies
          rawData={props.replies}
          currentUser={props.currentUser}
        />
      )}
    </>
  );
}
