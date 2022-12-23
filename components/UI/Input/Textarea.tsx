import { LegacyRef } from "react";

const REPLY_PLACEHOLDER = "Add a comment...";

export default function Textarea(props: {
  textareaRef?: LegacyRef<HTMLTextAreaElement>;
  content?: string;
  showError: boolean;
  currentUser?: boolean;
}): JSX.Element {
  function ErrorMessage(): JSX.Element {
    return <p className={"text-softRed"}>Error: comment cannot be empty</p>;
  }

  return (
    <>
      <textarea
        ref={props.textareaRef}
        cols={25}
        rows={3}
        placeholder={REPLY_PLACEHOLDER}
        className={`w-full text-darkBlue px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-transparent focus:ring-moderateBlue focus:ring-1 caret-moderateBlue selection:bg-lightGrayishBlue 
        ${props.showError ? "border-softRed" : "border-lightGray"}`}
        defaultValue={props.content}
        autoFocus={props.currentUser ? true : false}
      ></textarea>
      {props.showError && <ErrorMessage />}
    </>
  );
}
