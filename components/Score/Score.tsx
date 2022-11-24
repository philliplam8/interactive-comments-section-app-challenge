import { useState } from "react";
import { Plus, Minus } from "../UI/Buttons";

export default function Score(props: { initialScore: number }): JSX.Element {
  const [score, setScore] = useState(props.initialScore);

  const handleIncrement = (): void => {
    setScore(score + 1);
  };

  const handleDecrement = (): void => {
    // Allow negative score as
    setScore(score - 1);
  };

  return (
    <div className="w-[100px] h-[40px] sm:w-[40px] sm:h-[100px] flex flex-row sm:flex-col justify-between items-center bg-veryLightGray text-moderateBlue font-medium rounded-xl">
      <Plus handleClick={handleIncrement} />
      <div className="w-20 h-full sm:h-24 flex justify-center items-center">
        {score}
      </div>
      <Minus handleClick={handleDecrement} />
    </div>
  );
}
