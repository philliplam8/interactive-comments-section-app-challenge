import cloneDeep from "lodash/cloneDeep";
import { useContext } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { Plus, Minus } from "../UI/Buttons";

export default function Score(props: {
  initialScore: number;
  groupId: string;
  commentId: string;
}): JSX.Element {
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  /**
   * Change the score by +1 or -1 if the user upvotes or downvotes, respectively
   * @param {string} changeType Either an incrememnt or decrement
   */
  const handleScoreChange = (changeType: string) => {
    let changeValue;
    if (changeType === "increment") {
      changeValue = 1;
    }
    if (changeType === "decrement") {
      changeValue = -1;
    }
    // Create deep copy of the comments context state
    let updatedComments = cloneDeep(allData);

    // Determine if this is a parent comment or reply
    const isParent = props.groupId === props.commentId;
    if (isParent) {
      updatedComments.comments[props.groupId].score += changeValue;
    } else {
      updatedComments.replies[props.groupId][props.commentId].score +=
        changeValue;
    }
    // Update context state
    setAllData(updatedComments);
  };

  /**
   * Increment the comment score by 1
   */
  const handleIncrement = () => {
    handleScoreChange("increment");
  };
  /**
   * Decrement the comment score by 1
   */
  const handleDecrement = () => {
    handleScoreChange("decrement");
  };

  return (
    <div className="w-[100px] h-[40px] sm:w-[40px] sm:h-[100px] flex flex-row sm:flex-col justify-between items-center bg-veryLightGray text-moderateBlue font-medium rounded-xl">
      <Plus handleClick={handleIncrement} />
      <div
        className={`w-20 h-full sm:h-24 flex justify-center items-center ${
          props.initialScore >= 0 ? "text-moderateBlue" : "text-softRed"
        }`}
      >
        {props.initialScore}
      </div>
      <Minus handleClick={handleDecrement} />
    </div>
  );
}
