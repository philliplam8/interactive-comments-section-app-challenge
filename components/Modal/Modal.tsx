import { useState, useEffect } from "react";
import { Card } from "../UI/Card";
import { SecondaryButton, ErrorButton } from "../UI/Buttons";
import { Backdrop } from "../Backdrop";

const TEXT = {
  DELETE_CONFIRMATION:
    "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
  BTN_NO: "NO, CANCEL",
  BTN_YES: "YES, DELETE",
};

export default function Modal(): JSX.Element {
  const [showModal, setShowModal] = useState(true);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  function ModalContent(): JSX.Element {
    return (
      <div className="w-full max-w-[400px] z-30">
        <Card>
          <div className="flex flex-col gap-4 p-2">
            <h1 className="text-xl sm:text-2xl text-darkBlue font-medium ">
              Delete comment
            </h1>
            <p className="text-grayishBlue">{TEXT.DELETE_CONFIRMATION}</p>
            <div className="flex flex-col min-[370px]:flex-row gap-3 justify-between">
              <SecondaryButton
                label={TEXT.BTN_NO}
                handleClick={handleModalToggle}
              />
              <ErrorButton label={TEXT.BTN_YES} />
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
    <>
      {showModal && (
        <>
          <Backdrop show={showModal}>
            <ModalContent />
          </Backdrop>
        </>
      )}
    </>
  );
}
