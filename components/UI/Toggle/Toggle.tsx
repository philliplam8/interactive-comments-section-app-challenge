import { useState } from "react";

export default function Toggle(): JSX.Element {
  const [toggle, setToggle] = useState(false);

  const handleToggleClick = () => {
    setToggle(!toggle);
  };

  return (
    <button
      className={`flex flex-row items-center h-6 w-12 my-2 border-2 border-grayishBlue rounded-full transition ease-in-out relative`}
      onClick={handleToggleClick}
    >
      <div
        className={`flex flex-row items-center m-1 h-4 w-4 border-2 border-transparent rounded-full bg-grayishBlue absolute left-0 transition duration-200 ease-in-out
         ${toggle ? "" : "translate-x-5"}`}
      ></div>
    </button>
  );
}
