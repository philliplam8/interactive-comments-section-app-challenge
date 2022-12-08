import { useState } from "react";
import { Comment, CommentReplies, RawComment, RawReply, RawImage } from "./";

export default function Comments(props: {
  currentUser: string;
  comments: RawComment[];
  replies: { [x: string]: { [s: string]: RawReply } | ArrayLike<RawReply> };
  userAvatars: { [x: string]: RawImage };
}): JSX.Element {
  const [parentComments, setParentComments] = useState(props.comments);

  return (
    <>
      {parentComments.map((entry: RawComment) => {
        const avatarImages = props.userAvatars[entry.username];
        const png = avatarImages.png;
        const webp = avatarImages.webp;

        return (
          <>
            {/* Parent Comment */}
            <Comment
              key={entry.id}
              currentUser={props.currentUser}
              content={entry.content}
              avatarPng={png}
              avatarWebp={webp}
              createdAt={entry.createdAt}
              score={entry.score}
              username={entry.username}
            />
            {/* Child Replies */}
            {entry.hasReplies && (
              <CommentReplies
                rawData={props.replies[entry.id]}
                userAvatars={props.userAvatars}
                currentUser={props.currentUser}
              />
            )}
          </>
        );
      })}
    </>
  );
}
