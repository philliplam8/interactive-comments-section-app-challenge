import { Card } from "../UI/Card";
import { Plus, Minus, Reply, Edit, Delete } from "../UI/Buttons";
import { Badge } from "../Badge";
import { Score } from "../Score";

export default function Comment(props: { self: boolean }): JSX.Element {
  function CardHeader(props: {
    avatar: string;
    username: string;
    time: string;
    self: boolean;
  }): JSX.Element {
    return (
      <div className="flex flex-row flex-wrap gap-4">
        <div>Avatar</div>
        <h1 className="font-medium text-darkBlue">{props.username}</h1>
        {props.self && <Badge />}
        <div>{props.time}</div>
      </div>
    );
  }

  function CardActions(props: { self: boolean }): JSX.Element {
    return (
      <>
        {props.self ? (
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

  function CardFooterMobile(props: { self: boolean }): JSX.Element {
    return (
      <div className="sm:hidden flex flex-row justify-between">
        <Score initialScore={12} />
        <CardActions self={props.self} />
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
              avatar={""}
              username={"amyrobson"}
              time={"1 month ago"}
              self={props.self}
            />
            <div className="hidden sm:block">
              <CardActions self={props.self} />
            </div>
          </div>

          <div id="comment">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
            in culpa odit qui eum explicabo ea placeat eaque libero obcaecati
            assumenda, et porro! Doloremque, repellat. Dolor fuga et nam quos?
          </div>

          <CardFooterMobile self={props.self} />
        </div>
      </div>
    </Card>
  );
}
