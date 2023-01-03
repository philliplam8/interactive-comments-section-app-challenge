import { Comment, RawReply, RawImage } from "./";

interface RepliesInterface {
  rawData: { [s: string]: RawReply } | ArrayLike<RawReply>;
  userAvatars: { [x: string]: RawImage };
  currentUser: string;
  groupId: string;
}

export default function CommentReplies(props: RepliesInterface): JSX.Element {
  // Get array of all replies for this specific comment
  const replies: RawReply[] = Object.values(props.rawData);

  function Divider(): JSX.Element {
    return (
      <div className="w-1 ml-0 mr-4 sm:mx-8 border-r-2 dark:border-darkModeCard"></div>
    );
  }

  return (
    <div className="max-w-[730px] w-full flex flex-row">
      <Divider />
      <div className="w-full flex flex-col gap-4">
        {replies.map((reply) => {
          const avatarImages = props.userAvatars[reply.username];
          const png = avatarImages.png;
          const webp = avatarImages.webp;

          return (
            <Comment
              key={reply.id}
              commentId={reply.id}
              groupId={props.groupId}
              currentUser={props.currentUser}
              content={reply.content}
              avatarPng={png}
              avatarWebp={webp}
              createdAt={reply.createdAt}
              editedAt={reply.editedAt}
              displayedDate={reply.displayedDate}
              score={reply.score}
              replyingTo={reply.replyingTo}
              username={reply.username}
              hasReplies={false}
            />
          );
        })}
      </div>
    </div>
  );
}
