import cloneDeep from "lodash/cloneDeep";
import { useContext, useState } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { Plus, Minus } from "../UI/Buttons";

export default function Score(props: {
  initialScore: { [s: string]: number; };
  groupId: string;
  commentId: string;
  currentUser: string;
}): JSX.Element {
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  const [totalScore, setTotalScore] = useState(() => {
    let total: number = 0;
    const allScores: number[] = Object.values(props.initialScore);
    for (let i = 0; i < allScores.length; i++) {
      total += allScores[i];
    }
    return total;
  });

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
    // Parent Comment
    if (isParent) {
      let scoreEntry = updatedComments.comments[props.groupId].score;
      // if score already exists and user clicks same vote, undo it
      if (
        props.currentUser in scoreEntry &&
        scoreEntry[props.currentUser] === changeValue
      ) {
        delete scoreEntry[props.currentUser];
      }
      // otherwise, add vote as a new key value
      else {
        scoreEntry[props.currentUser] = changeValue;
      }
    }
    // Child Reply
    else {
      let scoreEntry =
        updatedComments.replies[props.groupId][props.commentId].score;
      // if score already exists and user clicks same vote, undo it
      if (
        props.currentUser in scoreEntry &&
        scoreEntry[props.currentUser] === changeValue
      ) {
        delete scoreEntry[props.currentUser];
      }
      // otherwise, add vote as a new key value
      else {
        scoreEntry[props.currentUser] = changeValue;
      }
    }

    // Show Reset Button
    updatedComments.showReset = true;
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
    <div className="w-[100px] h-[40px] sm:w-[40px] sm:h-[100px] flex flex-row sm:flex-col justify-between items-center bg-veryLightGray dark:bg-darkModeBlue font-medium rounded-xl">
      <Plus
        handleClick={handleIncrement}
        isClicked={props.initialScore[props.currentUser] > 0}
      />
      <div
        className={`w-20 h-full sm:h-24 flex justify-center items-center ${
          totalScore >= 0
            ? "text-moderateBlue dark:text-darkModeModerateBlue"
            : "text-softRed"
        }`}
      >
        {totalScore}
      </div>
      <Minus
        handleClick={handleDecrement}
        isClicked={props.initialScore[props.currentUser] < 0}
      />
    </div>
  );
}
