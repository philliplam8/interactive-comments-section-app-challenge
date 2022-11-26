import { CommentContainer, RawCommentInterface } from "./";

export default function Comments(props: {
  allComments: { comments: RawCommentInterface[] },
  
}): JSX.Element {
  const parentComments = props.allComments.comments;
  const currentUser = props.allComments.currentUser.username;

  return (
    <>
      {parentComments.map((entry: RawCommentInterface) => {
        return (
          <CommentContainer
            key={entry.id}
            currentUser={currentUser}
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
