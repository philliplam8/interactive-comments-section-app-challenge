import { MouseEventHandler } from "react";

export default function Toggle(props: {
  isToggleOn: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button
      className={`flex flex-row items-center h-6 w-12 my-2 border-2 border-grayishBlue rounded-full transition ease-in-out relative`}
      onClick={props.handleClick}
    >
      <div
        className={`flex flex-row items-center m-1 h-4 w-4 border-2 border-transparent rounded-full bg-grayishBlue absolute left-0 transition duration-200 ease-in-out ${
          props.isToggleOn ? "translate-x-5" : ""
        }`}
      ></div>
    </button>
  );
}
