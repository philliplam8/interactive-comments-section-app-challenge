import { LegacyRef } from "react";

const REPLY_PLACEHOLDER = "Add a comment...";

export default function Textarea(props: {
  textareaRef: LegacyRef<HTMLTextAreaElement>;
  content: string;
}): JSX.Element {
  return (
    <textarea
      ref={props.textareaRef}
      cols={25}
      rows={3}
      placeholder={REPLY_PLACEHOLDER}
      className={`w-full text-darkBlue px-4 py-2 rounded-lg border-2 border-lightGray focus:outline-none focus:border-transparent focus:ring-moderateBlue focus:ring-1 caret-moderateBlue selection:bg-lightGrayishBlue`}
      defaultValue={props.content}
    ></textarea>
  );
}
