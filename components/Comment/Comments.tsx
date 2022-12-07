import { useState } from "react";
import {
  Comment,
  CommentReplies,
  RawCommentInterface,
  RawCurrentUserInterface,
} from "./";

export default function Comments(props: {
  currentUser: RawCurrentUserInterface;
  comments: RawCommentInterface[];
}): JSX.Element {
  const [parentComments, setParentComments] = useState(props.comments);

  return (
    <>
      {parentComments.map((entry: RawCommentInterface) => {
        const hasReplies = entry.replies.length > 0;
        return (
          <>
            {/* Parent Comment */}
            <Comment
              key={entry.id}
              currentUser={props.currentUser}
              content={entry.content}
              avatarPng={entry.user.image.png}
              avatarWebp={entry.user.image.webp}
              createdAt={entry.createdAt}
              score={entry.score}
              username={entry.user.username}
            />
            {/* Child Replies */}
            {hasReplies && (
              <CommentReplies
                rawData={entry.replies}
                currentUser={props.currentUser}
              />
            )}
          </>
        );
      })}
    </>
  );
}
