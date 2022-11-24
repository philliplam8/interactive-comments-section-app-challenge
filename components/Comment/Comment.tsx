import { Card } from "../UI/Card";
import { Avatar } from "../Avatar";
import { Reply, Edit, Delete } from "../UI/Buttons";
import { Badge } from "../Badge";
import { Score } from "../Score";

interface CardHeaderProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
  createdAt: string;
  currentUser: boolean;
}

interface CardProps extends CardHeaderProps {
  content: string;
}

export default function Comment(props: CardProps): JSX.Element {
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

  function CardFooterMobile(props: { currentUser: boolean }): JSX.Element {
    return (
      <div className="sm:hidden flex flex-row justify-between">
        <Score initialScore={12} />
        <CardActions currentUser={props.currentUser} />
      </div>
    );
  }

  return (
    <Card>
      <div className="h-full flex flex-col sm:flex-row justify-between sm:justify-start sm:gap-4 text-grayishBlue">
        <div className="hidden sm:block">
          <Score initialScore={12} />
        </div>
        <div className="flex flex-col sm:flex-col gap-4">
          <div className="flex flex-row justify-between">
            <CardHeader
              avatarPng="/images/avatars/image-amyrobson.png"
              avatarWebp="/images/avatars/image-amyrobson.webp"
              username={"amyrobson"}
              createdAt={"1 month ago"}
              currentUser={props.currentUser}
            />
            <div className="hidden sm:block">
              <CardActions currentUser={props.currentUser} />
            </div>
          </div>

          <div id="comment">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
            in culpa odit qui eum explicabo ea placeat eaque libero obcaecati
            assumenda, et porro! Doloremque, repellat. Dolor fuga et nam quos?
            {props.content}
          </div>

          <CardFooterMobile currentUser={props.currentUser} />
        </div>
      </div>
    </Card>
  );
}
