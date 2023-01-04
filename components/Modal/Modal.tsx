import { useState, useEffect, useContext } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { Card } from "../UI/Card";
import { SecondaryButton, ErrorButton } from "../UI/Buttons";
import { Backdrop } from "../UI/Backdrop";

const TEXT = {
  DELETE_CONFIRMATION:
    "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
  BTN_NO: "NO, CANCEL",
  BTN_YES: "YES, DELETE",
};

export default function Modal(): JSX.Element {
  const { modalValue } = useContext(CommentsContext);
  const [showModal, handleModalToggle, handleDeleteComment] = modalValue;

  function ModalContent(): JSX.Element {
    return (
      <div className="w-full max-w-[400px]">
        <Card>
          <div className="flex flex-col gap-4 p-2">
            <h1 className="text-xl sm:text-2xl text-darkBlue dark:text-white font-medium ">
              Delete comment
            </h1>
            <p>{TEXT.DELETE_CONFIRMATION}</p>
            <div className="flex flex-col min-[370px]:flex-row gap-3 justify-between">
              <SecondaryButton
                label={TEXT.BTN_NO}
                handleClick={handleModalToggle}
              />
              <ErrorButton
                label={TEXT.BTN_YES}
                handleClick={handleDeleteComment}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Disable vertical scrolling when the modal is open
  useEffect((): void => {
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  });

  return (
    <div className="z-30 sticky top-0">
      {showModal && (
        <>
          <Backdrop show={showModal}>
            <ModalContent />
          </Backdrop>
        </>
      )}
    </div>
  );
}
