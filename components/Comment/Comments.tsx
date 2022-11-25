import { CommentContainer, ParentCommentProps } from "./";

export default function Comments(props: {
  allComments: { comments: ParentCommentProps[] };
}): JSX.Element {
  const parentComments = props.allComments.comments;

  return (
    <>
      {parentComments.map((entry: ParentCommentProps) => {
        return (
          <CommentContainer
            key={entry.id}
            currentUser={false}
            content={entry.content}
            avatarPng={entry.user.image.png}
            avatarWebp={entry.user.image.webp}
            createdAt={entry.createdAt}
            score={entry.score}
            username={entry.user.username}
            replies={entry.replies}
          />
        );
      })}
    </>
  );
}