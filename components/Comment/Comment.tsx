import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { Reply, Edit, Delete } from "../UI/Buttons";
import { Badge } from "../Badge";
import { Score } from "../Score";
import { CardHeaderProps, CommentProps } from "./CommentInterface";

export default function Comment(props: CommentProps): JSX.Element {
  function CardHeader(props: CardHeaderProps): JSX.Element {
    return (
      <div className="flex flex-row flex-wrap items-center gap-4">
        <div>
          <Avatar pngSrc={props.avatarPng} webpSrc={props.avatarWebp} />
        </div>
        <h1 className="font-medium text-darkBlue">{props.username}</h1>
        {props.currentUser && <Badge />}
        <div>{props.createdAt}</div>
      </div>
    );
  }

  function CardActions(props: { currentUser: boolean }): JSX.Element {
    return (
      <>
        {props.currentUser ? (
          <div className="flex flex-row gap-4">
            <Delete />
            <Edit />
          </div>
        ) : (
          <Reply />
        )}
      </>
    );
  }

  function CardFooterMobile(props: {
    currentUser: boolean;
    score: number;
  }): JSX.Element {
    return (
      <div className="sm:hidden flex flex-row justify-between">
        <Score initialScore={props.score} />
        <CardActions currentUser={props.currentUser} />
      </div>
    );
  }

  function ReplyingTo(props: { username: string }): JSX.Element {
    return (
      <div className="inline-block font-medium text-moderateBlue mr-1">
        @{props.username}
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className="h-full flex flex-col sm:flex-row justify-between sm:justify-start sm:gap-4 text-grayishBlue">
          <div className="hidden sm:block">
            <Score initialScore={props.score} />
          </div>
          <div className="flex flex-col sm:flex-col gap-4">
            <div className="flex flex-row justify-between">
              <CardHeader
                avatarPng={props.avatarPng}
                avatarWebp={props.avatarWebp}
                username={props.username}
                createdAt={props.createdAt}
                currentUser={props.currentUser}
              />
              <div className="hidden sm:block">
                <CardActions currentUser={props.currentUser} />
              </div>
            </div>

            <div id="comment">
              {props.replyingTo && <ReplyingTo username={props.replyingTo} />}
              <div className="inline">{props.content}</div>
            </div>

            <CardFooterMobile
              currentUser={props.currentUser}
              score={props.score}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
