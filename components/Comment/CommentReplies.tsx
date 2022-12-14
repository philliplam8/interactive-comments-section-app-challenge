import { Comment, RawReply, RawImage } from "./";

export default function CommentReplies(props: {
  rawData: { [s: string]: RawReply } | ArrayLike<RawReply>;
  userAvatars: { [x: string]: RawImage };
  currentUser: string;
}): JSX.Element {
  // Get array of all replies for this specific comment
  const replies: RawReply[] = Object.values(props.rawData);

  function Divider(): JSX.Element {
    return <div className="w-1 ml-0 mr-4 sm:mx-8 border-r-2"></div>;
  }

  return (
    <div className="max-w-[730px] flex flex-row justify-center mx-auto">
      <Divider />
      <div className="flex flex-col gap-5">
        {replies.map((reply) => {
          const avatarImages = props.userAvatars[reply.username];
          const png = avatarImages.png;
          const webp = avatarImages.webp;

          return (
            <Comment
              key={reply.id}
              currentUser={props.currentUser}
              content={reply.content}
              avatarPng={png}
              avatarWebp={webp}
              createdAt={reply.createdAt}
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
