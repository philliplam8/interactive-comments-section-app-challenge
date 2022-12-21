import { useContext } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { Comment, CommentReplies, RawComment, RawImage } from "./";

export default function Comments(props: { currentUser: string }): JSX.Element {
  // Comments Context
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  const parentComments: RawComment[] = Object.values(allData.comments);
  // Images
  const userAvatars: { [x: string]: RawImage } = allData.users;
  // Replies
  const childReplies = allData.replies;
  return (
    <>
      {parentComments.map((entry: RawComment) => {
        const { png, webp } = userAvatars[entry.username];

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
                rawData={childReplies[entry.id]}
                userAvatars={userAvatars}
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
