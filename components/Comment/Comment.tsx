import { Card } from "../Card";
import { Plus, Minus } from "../Buttons";

export default function Comment(): JSX.Element {
  function CardHeader(props: {
    avatar: string;
    name: string;
    time: string;
  }): JSX.Element {
    return (
      <div className="flex flex-row gap-4">
        <div>Avatar</div>
        <h1 className="font-medium text-darkBlue">{props.name}</h1>
        <div>{props.time}</div>
      </div>
    );
  }

  function Votes(): JSX.Element {
    return (
      <div className="w-[100px] h-[35px] sm:w-[40px] sm:h-[100px] px-4 py-5 sm:p-2 flex flex-row sm:flex-col justify-between items-center bg-veryLightGray text-moderateBlue font-medium rounded-xl">
        <Plus />
        <div>12</div>
        <Minus />
      </div>
    );
  }

  return (
    <Card>
      <div className="h-full flex flex-col sm:flex-row justify-between sm:justify-start sm:gap-4 text-grayishBlue">
        <div className="hidden sm:block">
          <Votes />
        </div>
        <div className="flex flex-col sm:flex-col gap-4">
          <CardHeader avatar={""} name={"amyrobson"} time={"1 month ago"} />

          <div id="comment">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
            in culpa odit qui eum explicabo ea placeat eaque libero obcaecati
            assumenda, et porro! Doloremque, repellat. Dolor fuga et nam quos?
          </div>

          <div className="sm:hidden block">
            <Votes />
          </div>
        </div>
      </div>
    </Card>
  );
}
