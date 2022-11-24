import { useState } from "react";
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
      <div className="absolute top-0 left-0 right-0 w-full max-w-[730px] mx-auto z-30">
        <Card>
          <div className="flex flex-col gap-4 p-2">
            <h1 className="text-xl sm:text-2xl text-darkBlue font-medium ">
              Delete comment
            </h1>
            <p className="text-grayishBlue">{TEXT.DELETE_CONFIRMATION}</p>
            <div className="flex flex-row gap-3 justify-start min-[375px]:justify-between">
              <SecondaryButton label={TEXT.BTN_NO} />
              <ErrorButton label={TEXT.BTN_YES} />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <>
          <ModalContent />
          <Backdrop show={showModal} closeModal={handleModalToggle} />
        </>
      )}
    </>
  );
}
