import { Comment, RawReplyInterface } from "./";

export default function CommentReplies(props: {
  rawData: RawReplyInterface[];
  currentUser: string;
}): JSX.Element {
  const replies = props.rawData;

  function Divider(): JSX.Element {
    return <div className="w-1 ml-0 mr-4 sm:mx-8 border-r-2"></div>;
  }

  return (
    <div className="max-w-[730px] flex flex-row justify-center mx-auto">
      <Divider />
      <div className="flex flex-col gap-5">
        {replies.map((reply: RawReplyInterface) => {
          return (
            <Comment
              key={reply.id}
              currentUser={props.currentUser}
              content={reply.content}
              avatarPng={reply.user.image.png}
              avatarWebp={reply.user.image.webp}
              createdAt={reply.createdAt}
              score={reply.score}
              replyingTo={reply.replyingTo}
              username={reply.user.username}
            />
          );
        })}
      </div>
    </div>
  );
}
