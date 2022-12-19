import { useState, useContext } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { Comment, CommentReplies, RawComment, RawReply, RawImage } from "./";

export default function Comments(props: {
  currentUser: string;
  replies: { [x: string]: { [s: string]: RawReply } | ArrayLike<RawReply> };
  userAvatars: { [x: string]: RawImage };
}): JSX.Element {
  // Comments Context
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  const parentComments: RawComment[] = Object.values(allData.comments);

  return (
    <>
      {parentComments.map((entry: RawComment) => {
        const avatarImages = props.userAvatars[entry.username];
        const png = avatarImages.png;
        const webp = avatarImages.webp;
        console.log(props.currentUser, entry.username);
        return (
          <div key={`group-${entry.id}`} className="flex flex-col gap-4">
            {/* Parent Comment */}
            <Comment
              key={entry.id}
              commentId={entry.id}
              groupId={entry.id}
              currentUser={props.currentUser}
              content={entry.content}
              avatarPng={png}
              avatarWebp={webp}
              createdAt={entry.createdAt}
              displayedDate={entry.displayedDate}
              score={entry.score}
              username={entry.username}
              hasReplies={entry.hasReplies}
            />
            {/* Child Replies */}
            {entry.hasReplies && (
              <CommentReplies
                rawData={props.replies[entry.id]}
                userAvatars={props.userAvatars}
                currentUser={props.currentUser}
                groupId={entry.id}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
